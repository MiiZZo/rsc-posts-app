import { z } from 'zod';

export const createFailResponseContract = <T extends readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]>(...messages: T) => {
  return z.object({
    result: z.literal(false),
    message: z.union(messages),
  });
};
