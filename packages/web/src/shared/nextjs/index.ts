import { Event, Store, allSettled, createEvent, fork, sample, serialize } from 'effector';
import { once } from 'patronum/once';
import { GetServerSideProps, GetServerSidePropsContext, PreviewData, Redirect } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { defaultUnprotectedRoute } from 'shared/navigation';

type Config<T = void, R = void> = T extends void ? {
  pageEvent?: Event<T>;
  isProtectedRoute: boolean;
} : {
  pageEvent: Event<T>;
  isProtectedRoute: boolean;
  getParams: (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => T;
  validateParams?: {
    if: (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => boolean;
    then: (
      | { redirect: Redirect }
      | { notFound: true }
    )
  };
  validateResult?: {
    source: Store<R>;
    if: (source: R) => boolean;
    then: (
      | { redirect: Redirect }
      | { notFound: true }
    )
  };
}

function isConfigWithGetParams(value: unknown): value is Config<unknown, unknown> {
  return typeof value === 'object' && value !== null && 'getParams' in value;
}

export const somePageOpened = createEvent();
export const appStarted = once(somePageOpened);

export function GSSFactory<T = void, R = void>(config: Config<T, R>): GetServerSideProps {
  if (config.pageEvent) {
    sample({
      clock: config.pageEvent,
      target: somePageOpened,
    });
  }
  
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

    if (isConfigWithGetParams(config)) {
      if (config.validateParams) {
        if (config.validateParams.if(ctx)) {
          return config.validateParams.then;
        }
      }

      await allSettled(config.pageEvent, {
        scope,
        params: config.getParams(ctx),
      });

      if (config.validateResult) {
        const value = scope.getState(config.validateResult.source);

        if (config.validateResult.if(value)) {
          return config.validateResult.then;
        }
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

  return getServerSideProps;
}
