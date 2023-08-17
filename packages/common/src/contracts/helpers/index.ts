import { createFailResponseContract } from './create-fail-response-contract';
import { createNotAuthResponseContract } from './create-not-auth-response-contract';
import { createNotFoundResponseContract } from './create-not-found-response-contract';
import { createSuccessResponseContract } from './create-success-response-contract';

export const contractBuilder = {
  fail: {
    base: createFailResponseContract,
    notFound: createNotFoundResponseContract,
    notAuth: createNotAuthResponseContract,
  },
  success: {
    base: createSuccessResponseContract,
  }
};
