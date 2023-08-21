import { z } from 'zod';
import { contractBuilder } from '../../helpers';
import { SIGN_UP_ERRORS } from './config';

export const emailBusyFailSignUpContract = contractBuilder.fail.notAuth(
  SIGN_UP_ERRORS.EMAIL_BUSY
);

export type EmailBusyFailSignUpResponse = z.infer<typeof emailBusyFailSignUpContract>;

export const usernameBusyFailSignUpContract = contractBuilder.fail.notAuth(
  SIGN_UP_ERRORS.USERNAME_BUSY
);

export type UsernameBusyFailSignUpResponse = z.infer<typeof usernameBusyFailSignUpContract>;


export const successSignUpResponseContract = contractBuilder.success.base(z.null());

export type SuccessSignUpResponse = z.infer<typeof successSignUpResponseContract>;

export type SignUpResponse = SuccessSignUpResponse | EmailBusyFailSignUpResponse | UsernameBusyFailSignUpResponse;
