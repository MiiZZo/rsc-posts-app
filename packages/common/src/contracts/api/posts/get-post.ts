import { z } from 'zod';
import { postContract } from '../../entities';
import { contractBuilder } from '../../helpers';

export const successGetPostContract = contractBuilder.success.base(postContract);
export type SuccessGetPostResponse = z.infer<typeof successGetPostContract>;

export const postNotFoundContract = contractBuilder.fail.notFound('POST_NOT_FOUND');
export type PostNotFoundResponse = z.infer<typeof postNotFoundContract>;
