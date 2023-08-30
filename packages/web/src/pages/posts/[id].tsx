import { useUnit } from 'effector-react';
import { Title, Text, Group, Anchor } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'
import { GSSFactory } from 'shared/nextjs';
import { paths } from 'shared/navigation';
import { ClientOnly } from 'shared/ui/client-only';
import { Avatar } from 'shared/ui/avatar';
import * as model from './model';

export default function PostPage() {
  const post = useUnit(model.$formattedPost)!;
  const title = `Post it! | ${post.title}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Text c="dimmed">{post.createdAt}</Text>
      <Title mt="md">{post.title}</Title>
      <Text c="dimmed" mt="xl" mb="xs">
        Author
      </Text>
      <Anchor
        component={Link}
        href={paths.profiles({ username: post.user.username })}
        td="none"
      >
        <Group gap="xs">
          <Avatar
            username={post.user.username}
          />
          <Text fz="sm" c="dimmed" fw={600}>
            {post.user.username}
          </Text>
        </Group>
      </Anchor>
      <Text mt="xl">
        <ClientOnly>
          <ReactMarkdown>
            {post.body}
          </ReactMarkdown>
        </ClientOnly>
      </Text>
    </>
  );
}

export const getServerSideProps = GSSFactory({
  pageEvent: model.pageOpened,
  getParams: (ctx) => {
    return {
      id: ctx.params!.id as string,
    };
  },
  validateResult: {
    source: model.$post,
    if: (post) => !post,
    then: {
      notFound: true,
    },
  },
  isProtectedRoute: false,
});
