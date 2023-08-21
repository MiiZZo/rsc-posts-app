import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { user } from 'common/types';
import { sample } from 'effector';
import { config } from '../config';
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
  fn: () => ({ message: config.SUCCESS_SIGN_UP_MESSAGE, color: 'green' }),
  target: [
    notificationsModel.notifyFx,
    signUpForm.cleared,
    routerModel.navigateFx.prepend(() => '/sign-in')
  ],
});

sample({
  clock: signUpQuery.finished.emailBusy.event,
  fn: () => ({ message: config.EMAIL_BUSY_MESSAGE, color: 'red' }),
  target: notificationsModel.notifyFx,
});

sample({
  clock: signUpQuery.finished.usernameBusy.event,
  fn: () => ({ message: config.USERNAME_BUSY_MESSSAGE, color: 'red' }),
  target: notificationsModel.notifyFx,
});
