export const paths = {
  home: () => '/',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  posts: ({ id }: { id: string }) => `/posts/${id}`,
  profiles: ({ username }: { username: string }) => `/profiles/${username}`,
  feed: ({ page }: { page: number }) => `/feed/${page}`,
};

export const defaultUnprotectedRoute = paths.signIn;
