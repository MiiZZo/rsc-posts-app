import { Event, allSettled, createEvent, fork, sample, serialize } from 'effector';
import { once } from 'patronum/once';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { defaultUnprotectedRoute } from 'shared/navigation';

type Config<T = void> = T extends void ? {
  pageEvent?: Event<T>;
  isProtectedRoute: boolean;
} : {
  pageEvent: Event<T>;
  isProtectedRoute: boolean;
  getParams: (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => T;
}

function isConfigWithGetParams(value: unknown): value is Config<unknown> {
  return typeof value === 'object' && value !== null && 'getParams' in value;
}

export const somePageOpened = createEvent();
export const appStarted = once(somePageOpened);

export function GSSFactory<T = void>(config: Config<T>): { getServerSideProps: GetServerSideProps } {
  const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (config.isProtectedRoute) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: defaultUnprotectedRoute(),
        }
      }
    }

    const scope = fork();

    if (config.pageEvent) {
      sample({
        clock: config.pageEvent,
        target: somePageOpened,
      });

      if (isConfigWithGetParams(config)) {
        await allSettled(config.pageEvent, {
          scope,
          params: config.getParams(ctx),
        });
      }
    } else {
      await allSettled(somePageOpened, {
        scope,
      });
    }

    return {
      props: {
        values: serialize(scope),
      },
    };
  }

  return {
    getServerSideProps
  };
}
