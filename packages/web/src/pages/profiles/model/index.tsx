import { PublicUser } from 'common/types';
import { createStore, sample } from 'effector';
import { api } from 'shared/api';

export const {
  getOneQuery,
} = api.users;

export const $user = createStore<PublicUser | null>(null);

sample({
  clock: getOneQuery.finished.success.event,
  source: getOneQuery.finished.success.$data,
  target: $user,
});
