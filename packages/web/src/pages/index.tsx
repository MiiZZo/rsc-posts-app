import { allSettled, fork, serialize } from 'effector';
import { GetServerSideProps } from 'next';

import { api } from 'shared/api';
import { ToggleTheme } from './_toggle-theme';

export default function Index() {
 return (
  <ToggleTheme />
 );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const scope = fork();

  await allSettled(api.posts.getOneQuery.start, {
    scope,
    params: {
      params: {
        id: '2',
      },
    },
  });

  return {
    props: {
      values: serialize(scope),
    },
  };
};
