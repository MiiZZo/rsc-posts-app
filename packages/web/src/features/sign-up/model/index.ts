import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { user } from 'common/types';
import { sample } from 'effector';
import { api } from 'shared/api';
import { notificationsModel } from 'shared/notifications';
import { routerModel } from 'shared/router';

export const { signUpQuery } = api.auth;

export const signUpForm = createForm(
  zodSchema({
    schema: user.omit({ id: true }),
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
  }),
);

sample({
  clock: signUpForm.submitted,
  source: signUpForm.$values,
  fn: (body) => ({ body }),
  target: signUpQuery.start,
});

sample({
  clock: signUpQuery.finished.success.event,
  fn: () => ({ message: 'Your account has been created! Now you can sign in.', color: 'green' }),
  target: [
    notificationsModel.notifyFx,
    signUpForm.cleared,
    routerModel.navigateFx.prepend(() => '/sign-in')
  ],
});

sample({
  clock: signUpQuery.finished.emailBusy.event,
  fn: () => ({ message: 'This email is already in use.', color: 'red' }),
  target: notificationsModel.notifyFx,
});

sample({
  clock: signUpQuery.finished.usernameBusy.event,
  fn: () => ({ message: 'This username is already in use.', color: 'red' }),
  target: notificationsModel.notifyFx,
});
