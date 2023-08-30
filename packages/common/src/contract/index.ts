import { createContract } from '@simple-contract/core';
import { z } from 'zod';
import { post, postComment, publicUser, user } from '../types';

export const contract = createContract('http://localhost:3000', {
  users: {
    path: '/users',
    routes: {
      getOne: {
        path: '/:username',
        method: 'GET',
        params: z.object({ username: z.string() }),
        responses: {
          success: publicUser,
          notFound: z.object({
            error: z.object({
              type: z.literal('NOT_FOUND'),
            }),
          }),
        }
      },
    },
  },
  auth: {
    path: '/auth',
    routes: {
      signUp: {
        path: '/sign-up',
        method: 'POST',
        body: user.pick({ username: true, email: true, password: true }),
        responses: {
          success: z.object({
            result: z.literal(true),
          }),
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
        body: user.pick({ username: true, password: true }),
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
      createOne: {
        method: 'POST',
        body: post.pick({ title: true, body: true, }),
        responses: {
          success: post,
        },
      },
      getOne: {
        path: '/:id',
        method: 'GET',
        responses: {
          success: post,
          notFound: z.object({
            error: z.object({
              type: z.literal('NOT_FOUND'),
            })
          })
        },
        params: z.object({ id: z.string() }),
      },
      getMany: {
        method: 'GET',
        query: z.object({
          take: z.number(),
          skip: z.number(),
        }),
        responses: {
          success: z.object({
            posts: z.array(post),
            count: z.number().int(),
          }),
        },
      }
    },
  },
  comments: {
    path: '/posts/:postId/comments',
    routes: {
      getMany: {
        method: 'GET',
        query: z.object({
          skip: z.number(),
          take: z.number(),
        }),
        responses: {
          succses: z.object({
            comments: z.array(postComment),
            count: z.number(),
          }),
        }
      },
      createOne: {
        method: 'POST',
        params: z.object({
          postId: z.string(),
        }),
        body: postComment.pick({ body: true }),
        responses: {
          success: postComment,
        },
      },
    },
  },
});
