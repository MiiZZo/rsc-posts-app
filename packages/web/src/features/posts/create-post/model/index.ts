import { sample } from 'effector';
import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { post } from 'common/types';
import { api } from 'shared/api';
import { routerModel } from 'shared/router';
import { paths } from 'shared/navigation';
import { notificationsModel } from 'shared/notifications';

export const {
  createOneQuery,
} = api.posts;

export const createPostForm = createForm(
  zodSchema({
    schema: post.pick({ title: true, body: true }),
    initialValues: {
      title: '',
      body: '',
    },
    clearOn: [createOneQuery.finished.success.event],
  }),
);

sample({
  clock: createPostForm.submitted,
  source: createPostForm.$values,
  fn: (body) => ({ body }),
  target: createOneQuery.start,
});

sample({
  clock: createOneQuery.finished.success.event,
  source: createOneQuery.finished.success.$data,
  fn: (result) => paths.posts({ id: result!.id }),
  target: [
    routerModel.navigateFx,
    notificationsModel.notifyFx.prepend(() => ({ message: 'Your post has been created!', color: 'green' })),
  ],
});
