import {
  useIntersection,
} from './use-intersection';
import {
  createInfiniteScrollModel,
} from './create-infinite-scroll-model';

export const infiniteScrollLib = {
  createInfiniteScrollModel,
  hooks: {
    useIntersection
  },
};
