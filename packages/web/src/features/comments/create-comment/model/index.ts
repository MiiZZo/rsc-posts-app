import { createForm } from '@effective-forms/core';
import { zodSchema } from '@effective-forms/zod';
import { invoke } from '@withease/factories';
import { postComment } from 'common/types';
import { sample } from 'effector';
import { api } from 'shared/api';
import { effectorLib } from 'shared/effector';
import { routerModel } from 'shared/router';

export const { createOneQuery } = api.comments;

export const { $isLoading } = invoke(effectorLib.createDelayedLoading, {
  loadingStarted: createOneQuery.start,
  loadingEnded: createOneQuery.finished.success.event,
});

export const commentCreated = sample({
  clock: createOneQuery.finished.success.event,
  source: createOneQuery.finished.success.$data,
  filter: Boolean,
});

export const createCommentForm = createForm(
  zodSchema({
    schema: postComment.pick({ body: true }),
    initialValues: {
      body: '',
    },
    clearOn: [createOneQuery.finished.success.event],
  }),
);

sample({
  clock: createCommentForm.submitted,
  source: [createCommentForm.$values, routerModel.$query] as const,
  fn: ([body, query]) => ({ body, params: { postId: query.id as string } }),
  target: createOneQuery.start,
});
