import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { sample } from 'effector';
import { user } from 'common/types';
import { viewerModel } from 'entities/viewer'
import { api } from 'shared/api';
import { notificationsModel } from 'shared/notifications';
import { routerModel } from 'shared/router';

export const signInQuery = api.auth.signInQuery;

export const signInForm = createForm(
  zodSchema({
    schema: user.omit({ id: true, email: true }),
    initialValues: {
      username: '',
      password: '',
    },
  }),
);

sample({
  clock: signInForm.submitted,
  source: signInForm.$values,
  fn: (body) => ({ body }),
  target: signInQuery.start,
});

sample({
  clock: signInQuery.finished.success.event,
  source: signInQuery.finished.success.$data,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fn: (data) => ({ accessToken: data!.accessToken }),
  target: [
    signInForm.cleared,
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
