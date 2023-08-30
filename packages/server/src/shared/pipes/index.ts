import { RequestMethod } from '@nestjs/common';

export function mapRequest({
  path,
  method,
}: {
  path?: string | null,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
}) {
  return {
    path: path ?? '',
    method: RequestMethod[method],
  }
};
