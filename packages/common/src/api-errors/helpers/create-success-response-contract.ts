import { z } from 'zod';

export function createSuccessResponseContract<T extends z.ZodTypeAny>(payload: T) {
  return z.object({
    result: z.literal(true),
    payload,
  });
}
