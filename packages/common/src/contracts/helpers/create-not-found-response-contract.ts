import { z } from 'zod';
import { createFailResponseContract } from './create-fail-response-contract';
import { notFound } from '../api/base';

export const createNotFoundResponseContract = <T extends string>(message: T) => {
  return createFailResponseContract({ error: { type: notFound, message: z.literal(message) } });
};
