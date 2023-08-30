import { InferResponsesTypes, InferRoutePayloadType } from '@simple-contract/core';
import { contract } from '@common/contract';
import { OneOf } from '@shared/types';

export const {
  routes: {
    createOne,
    getMany,
  }
} = contract.comments;

type Responses = InferResponsesTypes<typeof contract.comments.routes>;

type MergePayload<T extends { query?: unknown; body?: unknown; params?: unknown }> = T['query'] & T['body'] & T['params'];

export type CreateOneResponses = OneOf<Responses['createOne']>;
export type CreateOnePayload = MergePayload<InferRoutePayloadType<typeof createOne>>;
export type CreateOneBody = InferRoutePayloadType<typeof createOne>['body'];

export type GetManyResponses = OneOf<Responses['getMany']>;
export type GetManyPayload = MergePayload<InferRoutePayloadType<typeof getMany>>;
