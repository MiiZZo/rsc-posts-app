import { BadRequestException, Injectable, PipeTransform, RequestMethod } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    console.log(value);
    const { success } = this.schema.safeParse(value);
    if (!success) {
      throw new BadRequestException({
        error: {
          type: 'BAD_REQUEST',
        },
      });
    }

    return value;
  }
}

export function mapRequest({
  path,
  method,
}: {
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
}) {
  return {
    path,
    method: RequestMethod[method],
  }
};
