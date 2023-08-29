import { contract } from '@common/contract';
import { OneOf } from '@shared/types';
import { InferResponsesTypes, InferRoutePayloadType } from '@simple-contract/core';

const { routes } = contract.posts;
export const {
  createOne,
  getOne,
  getMany,
} = routes;

export type Responses = InferResponsesTypes<typeof routes>;

export type CreateOnePostRespones = OneOf<Responses['createOne']>;
export type CreateOnePostBody = InferRoutePayloadType<typeof createOne>['body'];

export type GetOnePostResponses = OneOf<Responses['getOne']>;
export type GetOneParams = InferRoutePayloadType<typeof getOne>['params'];

export type GetManyResponses = OneOf<Responses['getMany']>;
export type GetManyParams = InferRoutePayloadType<typeof getMany>;
