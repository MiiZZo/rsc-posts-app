import { useUnit } from 'effector-react';
import {
  Title,
  Text,
  Group,
  Anchor,
  Stack,
  rem,
  Divider,
  Box,
} from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { CreateComment } from 'features/comments/create-comment';
import { CommentCard, CommentCardSkeleton } from 'entities/comments';
import { GSSFactory } from 'shared/nextjs';
import { paths } from 'shared/navigation';
import { ClientOnly } from 'shared/ui/client-only';
import { Avatar } from 'shared/ui/avatar';
import { infiniteScrollLib } from 'shared/infinite-scroll';
import * as model from './model';
import { Fragment, useEffect, useRef } from 'react';

export default function PostPage() {
  const post = useUnit(model.$formattedPost)!;
  const comments = useUnit(model.$formattedComments);
  const commentsTotalCount = useUnit(model.commentsInfiniteScrollModel.$totalCount);
  const isMaxCommentsCount = useUnit(model.commentsInfiniteScrollModel.$isMaxItemsCount);
  const isFetchingMoreComments = useUnit(model.getManyCommentsQuery.$isPending);
  const onLoadMore = useUnit(model.commentsInfiniteScrollModel.loadMoreItems);
  const lastCommentRef = useRef<HTMLDivElement>(null);
  const intersection = infiniteScrollLib.hooks.useIntersection(lastCommentRef, {}, [comments]);

  const title = `Post it! | ${post.title}`;

  useEffect(() => {
    if (intersection?.isIntersecting && comments.length < commentsTotalCount) {
      onLoadMore();
    }
  }, [intersection]);

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
          <Avatar username={post.user.username} />
          <Text fz="sm" c="dimmed" fw={600}>
            {post.user.username}
          </Text>
        </Group>
      </Anchor>
      <Text mt="xl">
        <ClientOnly>
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </ClientOnly>
      </Text>
      <Divider />
      <Text fz="xl" mt="xl" mb="xl">
        Comments ({commentsTotalCount})
      </Text>
      <Box mb="xl">
        <CreateComment />
      </Box>
      <Stack gap="xl" maw={rem(600)}>
        {comments.map((comment, i) => (
          <div key={comment.id} ref={i + 1 >= comments.length ? lastCommentRef : undefined}>
            <CommentCard
              comment={comment}
            />
          </div>
        ))}
      </Stack>
      {isFetchingMoreComments && (
        <CommentCardSkeleton />
      )}
      {isMaxCommentsCount && (
        <Text my="xl">
          There are no more comments!
        </Text>
      )}
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
