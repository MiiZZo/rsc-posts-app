import { GSSFactory } from 'shared/nextjs';
import { useUnit } from 'effector-react';
import { Flex, Group, Text, Title } from '@mantine/core';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Avatar } from 'shared/ui/avatar';
import * as model from './model';
import classes from './index.module.scss';
import Head from 'next/head';

export default function ProfilePage() {
  const user = useUnit(model.$user)!;
  const createdAt = useMemo(
    () => dayjs(user.createdAt).format('MMMM YYYY'),
    [user.createdAt]
  );
  const title = `Post it! | ${user.username}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex>
        <Group>
          <Avatar size="lg" username={user.username} />
          <Flex direction="column">
            <Title order={3}>{user.username}</Title>
            <Text className={classes.registeredDate}>
              A member of our big family since {createdAt}
            </Text>
          </Flex>
        </Group>
      </Flex>
    </>
  );
}

export const getServerSideProps = GSSFactory({
  pageEvent: model.getOneQuery.start,
  getParams: (ctx) => {
    return {
      params: {
        username: ctx.params!.username as string,
      },
    };
  },
  validateResult: {
    source: model.$user,
    if: (user) => !user,
    then: {
      notFound: true,
    },
  },
  isProtectedRoute: false,
});
