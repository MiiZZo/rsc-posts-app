import { Body, Controller, Delete, Param, Patch, Post, RequestMapping, Res, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateOnePost, UpdateOnePost } from '@common/types';
import { contract } from '@common/contract';
import { InferResponsesTypes } from '@simple-contract/core';
import { mapRequest } from '@shared/pipes';
import { Response } from 'express';

const { routes } = contract.posts;
const {
  getOne,
  updateOne
} = routes;

type Responses = InferResponsesTypes<typeof contract.posts.routes>;
type OneOf<T> = T[keyof T];
@Controller(contract.posts.path)
export class PostsController {
  constructor(
    private postsService: PostsService
  ) {}
  
  @RequestMapping(mapRequest(getOne))
  async getOne(
    @Param('id')
    id: string,
    @Res({ passthrough: true })
    res: Response
  ): Promise<OneOf<Responses['getOne']>> {
    const post = await this.postsService.getOne({ id });
    
    if (!post) {
      res.status(HttpStatus.NOT_FOUND);

      return ({
        error: {
          type: 'NOT_FOUND',
        }
      });
    }

    return post;
  }

  @Post()
  async createOne(
    @Body()
    createPost: CreateOnePost
  ) {
    return await this.postsService.createOne(createPost);
  }

  @Delete('/:id')
  async removeOne(
    @Param('id')
    id: string
  ) {
    return await this.postsService.removeOne({ id });
  }
  
  @Patch('/:id')
  async updateOne(
    @Param('id')
    id: string,
    @Body()
    body: UpdateOnePost
  ) {
    return await this.postsService.updateOne({ id, post: body.post })
  } 
}
