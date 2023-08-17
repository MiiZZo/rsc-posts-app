import { z } from 'zod';

const brandedUserId = z.string().brand<'USER'>();

export const userContract = z.object({
  id: brandedUserId,
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof userContract>;

const brandedPostId = z.string().brand<'POST'>();

export const postContract = z.object({
  id: brandedPostId,
  status: z.enum(['DRAFT', 'PUBLIC', 'PRIVATE']),
  title: z.string(),
  body: z.string(),
  authorId: brandedUserId,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Post = z.infer<typeof postContract>;

export const commentContract = z.object({
  id: z.string().brand<'COMMENT'>(),
  body: z.string(),
  postId: brandedPostId,
  authorId: brandedUserId,
});

export type Comment = z.infer<typeof commentContract>;
