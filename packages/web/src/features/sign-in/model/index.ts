import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { createStore, sample } from 'effector';
import { debounce } from 'patronum/debounce';
import { viewerModel } from 'shared/viewer'
import { api } from 'shared/api';
import { notificationsModel } from 'shared/notifications';
import { routerModel } from 'shared/router';
import { z } from 'zod';

export const signInQuery = api.auth.signInQuery;

const queryFinished = sample({
  clock: [
    signInQuery.finished.success.event,
    signInQuery.finished.badRequest.event,
  ],
});

export const formSubmittingEnded = debounce({
  source: queryFinished,
  timeout: 300,
});

export const $isFormSubmitting = createStore(false);

export const signInForm = createForm(
  zodSchema({
    schema: z.object({ username: z.string(), password: z.string() }),
    initialValues: {
      username: '',
      password: '',
    },
    clearOn: [signInQuery.finished.success.event]
  }),
);

sample({
  clock: signInForm.submitted,
  source: signInForm.$values,
  fn: (body) => ({ body }),
  target: signInQuery.start,
});

sample({
  clock: signInQuery.start,
  fn: () => true,
  target: $isFormSubmitting,
});

sample({
  clock: formSubmittingEnded,
  fn: () => false,
  target: $isFormSubmitting,
});

sample({
  clock: signInQuery.finished.success.event,
  source: signInQuery.finished.success.$data,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fn: (data) => ({ accessToken: data!.accessToken }),
  target: [
    viewerModel.signedIn,
    notificationsModel.notifyFx.prepend(() => ({ message: 'You are successfuly signed in!', color: 'green' })),
    routerModel.navigateFx.prepend(() => '/draft'),
  ],
});

sample({
  clock: signInQuery.finished.badRequest.event,
  fn: () => ({ message: 'There is no account with these credentials', color: 'red' }),
  target: notificationsModel.notifyFx,
});
