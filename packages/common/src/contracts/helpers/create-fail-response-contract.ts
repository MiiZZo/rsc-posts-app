import { z } from 'zod';

interface Config<T extends z.ZodLiteral<string>, M extends string> {
  error: {
    type: T;
    message: z.ZodLiteral<M>;
  };
}

export function createFailResponseContract<
  T extends z.ZodLiteral<string>, M extends string
>({
  error,
}: Config<T, M>) {
  return z.object({
    result: z.literal(false),
    error: z.object(error),
  });
};
