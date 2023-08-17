import { createContract } from '@simple-contract/core';
import { post } from '../types';
import { z } from 'zod';

export const contract = createContract('http://localhost:3000', {
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
