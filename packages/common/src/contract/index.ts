import { createContract } from '@simple-contract/core';
import { post, user } from '../types';
import { z } from 'zod';

export const contract = createContract('http://localhost:3000', {
  auth: {
    path: '/auth',
    routes: {
      signUp: {
        path: '/sign-up',
        method: 'POST',
        body: user.omit({ id: true }),
        responses: {
          success: user,
          emailBusy: z.object({
            error: z.object({
              type: z.literal('EMAIL_BUSY'),
            }),
          }),
          usernameBusy: z.object({
            error: z.object({
              type: z.literal('USERNAME_BUSY'),
            }),
          }),
        },
      },
      signIn: {
        path: '/sign-in',
        method: 'POST',
        body: user.omit({ id: true, email: true }),
        responses: {
          success: z.object({ accessToken: z.string() }),
          badRequest: z.object({
            error: z.object({
              type: z.literal('WRONG_CREDENTIALS'),
            }),
          }),
        },
      },
    },
  },
  posts: {
    path: '/posts',
    routes: {
      getOne: {
        path: '/:id',
        method: 'GET',
        params: z.object({
          id: z.string().uuid(),
        }),
        responses: {
          success: post,
          notFound: z.object({
            error: z.object({
              type: z.literal('NOT_FOUND'),
            }),
          }),
          badRequest: z.object({
            error: z.object({
              type: z.literal('BAD_REQUEST')
            }),
          }),
        },
      },
      updateOne: {
        path: '/:id',
        method: 'GET',
        responses: {},
      }  
    },
  },
});
