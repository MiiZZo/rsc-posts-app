import { Post } from 'common/types';
import { createStore, sample } from 'effector';
import { postsLib } from 'entities/posts';
import { api } from 'shared/api';

export const $post = createStore<Post | null>(null);
export const $formattedPost = $post.map(
  (post) => (
    post ?
      ({
        ...post,
        createdAt: postsLib.formatPostCreateDate(post.createdAt)
      }) :
      null
  )
);

export const { getOneQuery } = api.posts;

sample({
  clock: getOneQuery.finished.success.event,
  source: getOneQuery.finished.success.$data,
  target: $post,
});
