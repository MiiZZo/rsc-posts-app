import { z } from 'zod'
import { unauthorized } from '../api/base'
import { createFailResponseContract } from './create-fail-response-contract'

export const createNotAuthResponseContract = <T extends string>(message: T) => {
  return createFailResponseContract({ error: { type: unauthorized, message: z.literal(message) } })
}
