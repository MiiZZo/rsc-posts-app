import { createStore, sample } from 'effector';
import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { debounce } from 'patronum/debounce';
import { user } from 'common/types';
import { api } from 'shared/api';
import { notificationsModel } from 'shared/notifications';
import { routerModel } from 'shared/router';
import { config } from '../config';

export const { signUpQuery } = api.auth;

const queryFinished = sample({
  clock: [
    signUpQuery.finished.emailBusy.event,
    signUpQuery.finished.usernameBusy.event,
    signUpQuery.finished.success.event,
  ],
});

export const formSubmittingEnded = debounce({
  source: queryFinished,
  timeout: 300,
});

export const $isFormSubmitting = createStore(false);

export const signUpForm = createForm(
  zodSchema({
    schema: user.pick({ email: true, password: true, username: true }),
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    clearOn: [signUpQuery.finished.success.event]
  }),
);

sample({
  clock: signUpForm.submitted,
  source: signUpForm.$values,
  fn: (body) => ({ body }),
  target: signUpQuery.start,
});

sample({
  clock: signUpQuery.start,
  fn: () => true,
  target: $isFormSubmitting,
});

sample({
  clock: formSubmittingEnded,
  fn: () => false,
  target: $isFormSubmitting,
});

sample({
  clock: signUpQuery.finished.success.event,
  fn: () => ({ message: config.SUCCESS_SIGN_UP_MESSAGE, color: 'green' }),
  target: [
    notificationsModel.notifyFx,
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
