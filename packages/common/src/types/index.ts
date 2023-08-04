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

export interface GetOnePost {
  id: string;
}
