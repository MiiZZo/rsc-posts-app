import { invoke } from '@withease/factories';
import { Post } from 'common/types';
import { createEvent, createStore, sample } from 'effector';
import { commentsLib } from 'entities/comments';
import { postsLib } from 'entities/posts';
import { createCommentModel } from 'features/comments/create-comment';
import { api } from 'shared/api';
import { infiniteScrollLib } from 'shared/infinite-scroll';

export const $postId = createStore<string | null>(null);
export const pageOpened = createEvent<{ id: string }>();

export const $post = createStore<Post | null>(null);

export const $formattedPost = $post.map((post) =>
  post
    ? {
        ...post,
        createdAt: postsLib.formatPostCreateDate(post.createdAt),
      }
    : null
);

export const { getOneQuery } = api.posts;
export const { getManyQuery: getManyCommentsQuery } = api.comments;

export const commentsFetched = sample({
  clock: getManyCommentsQuery.finished.success.event,
  source: getManyCommentsQuery.finished.success.$data,
  filter: Boolean,
  fn: ({ count, comments }) => ({ count, items: comments }),
});

export const fetchComments = createEvent<{ skip: number; take: number; }>();

export const commentsInfiniteScrollModel = invoke(() => (
  infiniteScrollLib.createInfiniteScrollModel({
    take: 10,
    fetchItems: fetchComments,
    itemsFetched: commentsFetched,
  })
));

export const $formattedComments = commentsInfiniteScrollModel.$items.map(
  (items) => (
    items.map((item) => {
      return {
        ...item,
        createdAt: commentsLib.formatCommentCreateDate(item.createdAt),
      };
    })
  )
);

sample({
  clock: pageOpened,
  fn: ({ id }) => id,
  target: $postId,
});

sample({
  clock: fetchComments,
  source: $postId,
  filter: Boolean,
  fn: (postId, { skip, take }) => ({ query: { skip, take }, params: { postId } }),
  target: getManyCommentsQuery.start,
});

sample({
  clock: createCommentModel.commentCreated,
  target: commentsInfiniteScrollModel.addExtraItem,
});

sample({
  clock: pageOpened,
  target: [
    getOneQuery.start.prepend<{ id: string }>(({ id }) => ({ params: { id } })),
    commentsInfiniteScrollModel.loadInitialItems,
  ],
});

sample({
  clock: getOneQuery.finished.success.event,
  source: getOneQuery.finished.success.$data,
  target: $post,
});
