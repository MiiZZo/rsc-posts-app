import { z } from 'zod';
import { AtLeastOne } from '../utility-types';

const BASE_FIELD = {
  createdAt: z.string(),
  updatedAt: z.string(),
};

export const user = z.object({
  id: z.string(),
  username: z.string().min(2, 'Username must contains at least 2 symbols.').regex(/^[a-zA-Z]+$/, 'Username must contains only letters'),
  email: z.string().email('Must be a valid email.'),
  password: z.string().min(8, 'Password must contains at least 8 symbols.'),
  ...BASE_FIELD,
});

export const publicUser = user.omit({ password: true });

export type User = z.infer<typeof user>;
export type PublicUser = z.infer<typeof publicUser>;

export const post = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  user: user.pick({ id: true, email: true, username: true, }),
  ...BASE_FIELD,
});

export type Post = z.infer<typeof post>;

export const postComment = z.object({
  id: z.string(),
  body: z.string().max(255, 'Comment must contain no more than 255 characters.').min(5, 'Comment must contains at least 5 symbols.'),
  user: publicUser,
  ...BASE_FIELD,
});

export type PostComment = z.infer<typeof postComment>;

export interface CreateOnePost {
  title: string;
  body: string;
  userId: string;
};

export interface RemoveOnePost {
  id: string;
}

export interface UpdateOnePost {
  post: Partial<Omit<Post, "id" | "userId">>;
}

export interface FindOnePost {
  id: string;
}
export type FindOneUser = AtLeastOne<Pick<User, "username" | "email" | "id">>;
export interface SignIn {
  username: string;
  password: string;
}

export interface SignUp {
  username: string;
  password: string;
  email: string;
}
