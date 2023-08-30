import { Post } from 'common/types';
import { createEvent, createStore, sample } from 'effector';
import { api } from 'shared/api';

export const $post = createStore<Post | null>(null);

export const { getOneQuery } = api.posts;
export const pageOpened = createEvent<{ id: string }>();

sample({
  clock: pageOpened,
  fn: ({ id }) => ({ params: { id } }),
  target: getOneQuery.start,
});

sample({
  clock: getOneQuery.finished.success.event,
  source: getOneQuery.finished.success.$data,
  target: $post,
});
