import { GSSFactory } from 'shared/nextjs';
import { useUnit } from 'effector-react';
import {
  Pagination,
  Stack,
} from '@mantine/core';
import Head from 'next/head';
import { reflect } from '@effector/reflect';
import { PostPreview } from 'entities/posts';
import { routerModel } from 'shared/router';
import { paths } from 'shared/navigation';
import * as model from './model';

export const PaginatePosts = reflect({
  view: Pagination,
  bind: {
    total: model.$count,
    siblings: 2,
  },
});

export default function FeedPage() {
  const posts = useUnit(model.$formattedPosts);
  return (
    <>
      <Head>
        <title>Post it! | Feed</title>
      </Head>
      <Stack>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
        <PaginatePosts 
          onChange={(value) => routerModel.navigateFx(paths.feed({ page: value }))}
        />
      </Stack>
    </>
  );
}

export const getServerSideProps = GSSFactory({
  pageEvent: model.getManyQuery.start,
  getParams: (ctx) => ({
    query: {
      skip: parseInt(ctx.params!.page as string) - 1,
      take: 10,
    },
  }),
  validateParams: {
    if: (ctx) => {
      const page = ctx.params!.page;

      if (typeof page !== 'string') {
        return true;
      }

      const pageNumber = parseInt(page);

      if (!Number.isInteger(pageNumber)) {
        return true;
      }

      return false;
    },
    then: {
      notFound: true,
    },
  },
  validateResult: {
    source: model.$posts,
    if: (posts) => posts.length === 0,
    then: {
      notFound: true,
    },
  },
  isProtectedRoute: false,
});
