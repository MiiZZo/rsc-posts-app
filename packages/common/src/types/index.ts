import { z } from 'zod';
import { AtLeastOne } from '../utility-types';

export const post = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  userId: z.string(),
});

export type Post = z.infer<typeof post>;

export const user = z.object({
  id: z.string(),
  username: z.string().min(2, 'Username must contains at least 2 symbols.'),
  email: z.string().email('Must be a valid email.'),
  password: z.string().min(8, 'Password must contains at least 8 symbols.'),
});

export type User = z.infer<typeof user>;

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
