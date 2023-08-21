export const PATHS_CONFIG = {
  '/': {
    protected: true,
  },
  '/posts/:id': {
    protected: true,
  },
  '/sign-in': {
    protected: false,
  },
  '/sign-up': {
    protected: false,
  },
};

export const PROTECTED_PATHS = Object.keys(PATHS_CONFIG).filter((path) => PATHS_CONFIG[path as keyof typeof PATHS_CONFIG].protected);

export const paths = {
  home: () => '/',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
};

export const defaultUnprotectedRoute = paths.signIn;
