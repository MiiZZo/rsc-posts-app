import { z } from 'zod';
import { createFailResponseContract, createSuccessResponseContract } from '../helpers';
import { SIGN_UP_ERRORS } from './config';

export const failSignUpResponseContract = createFailResponseContract(
  z.literal(SIGN_UP_ERRORS.EMAIL_BUSY),
  z.literal(SIGN_UP_ERRORS.USERNAME_BUSY),
);

export const successSignUpResponseContract = createSuccessResponseContract(z.null());

export type FailSignUpResponse = z.infer<typeof failSignUpResponseContract>;
export type SuccessSignUpResponse = z.infer<typeof successSignUpResponseContract>;
