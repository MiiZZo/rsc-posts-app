import { z } from 'zod';

export const notFound = z.literal('NOT_FOUND');
export const forbidden = z.literal('FORBIDDEN');
export const unauthorized = z.literal('UNAUTHORIZED');
