import { PublicUser } from 'common/types';
import { createEvent, createStore, sample } from 'effector';

export const $user = createStore<PublicUser | null>(null);
export const $accessToken = createStore<string | null>(null);

export const signedIn = createEvent<{ user: PublicUser; accessToken: string }>();
export const signedOut = createEvent();

export const $isAuth = createStore(false);

sample({
  clock: signedIn,
  fn: () => true,
  target: $isAuth,
});

sample({
  clock: signedOut,
  target: [
    $isAuth.reinit!,
    $accessToken.reinit!,
  ],
});

sample({
  clock: signedIn,
  fn: ({ accessToken }) => accessToken,
  target: [
    $accessToken
  ],
});

sample({
  clock: signedIn,
  fn: ({ user }) => user,
  target: [
    $user
  ],
});
