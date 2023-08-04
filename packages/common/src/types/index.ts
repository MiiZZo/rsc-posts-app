import { AtLeastOne } from '../utility-types';

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
}

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

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
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
