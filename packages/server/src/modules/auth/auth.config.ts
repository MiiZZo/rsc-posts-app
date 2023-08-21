import { contract } from '@common/contract';
import { OneOf } from '@shared/types';
import { InferResponsesTypes } from '@simple-contract/core';

export const router = contract.auth;

export const {
  path: mainPath,
  routes: {
    signIn,
    signUp,
  },
} = router;

export type Responses = InferResponsesTypes<typeof router.routes>;

export type SignInResponses = OneOf<Responses['signIn']>;
export type SignUpResponses = OneOf<Responses['signUp']>;
