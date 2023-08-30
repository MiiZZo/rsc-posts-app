import { Post } from 'common/types';
import { createStore, sample } from 'effector';
import { postsLib } from 'entities/posts';
import { api } from 'shared/api';

export const {
  getManyQuery,
} = api.posts;

export const $count = createStore(0);
export const $posts = createStore<Post[]>([]);
export const $formattedPosts = $posts.map(
  (posts) => (
    posts.map(
      (post) => ({ ...post, createdAt: postsLib.formatPostCreateDate(post.createdAt) })
    )
  )
)

sample({
  clock: getManyQuery.finished.success.event,
  source: getManyQuery.finished.success.$data,
  fn: (result) => {
    if (!result) {
      return [];
    }

    return result.posts;
  },
  target: $posts,
});

sample({
  clock: getManyQuery.finished.success.event,
  source: getManyQuery.finished.success.$data,
  fn: (result) => {
    if (!result) {
      return 0;
    }

    const pagesCount = result.count / 10;

    return pagesCount < 1 ? 1 : pagesCount;
  },
  target: $count,
});
