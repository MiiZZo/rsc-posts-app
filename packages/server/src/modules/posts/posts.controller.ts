import { Body, Controller, Param, Query, Req, RequestMapping, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { contract } from '@common/contract';
import { AuthGuard } from '@modules/auth';
import { mapRequest } from '@shared/pipes';
import * as config from './posts.config';
import { PostsService } from './posts.service';

@Controller(contract.posts.path)
export class PostsController {
  constructor(
    private postsService: PostsService
  ) {}

  @UseGuards(AuthGuard)
  @RequestMapping(
    mapRequest({
      method: config.createOne.method
    })
  )
  async createOne(
    @Req()
    req: Request,
    @Body()
    createPost: config.CreateOnePostBody
  ) {
    return await this.postsService.createOne({ ...createPost, userId: req.user!.sub });
  }

  @RequestMapping(
    mapRequest(
      config.getOne,
    )
  )
  async getOne(
    @Param('id')
    id: string
  ): Promise<config.GetOnePostResponses> {
    const post = await this.postsService.findOne({ id });

    if (!post) {
      return {
        error: {
          type: 'NOT_FOUND'
        },
      };
    }

    return post;
  }

  @RequestMapping(
    mapRequest(
      config.getMany,
    )
  )
  async getMany(
    @Query('take')
    take: number,
    @Query('skip')
    skip: number
  ): Promise<config.GetManyResponses> {
    return this.postsService.findMany({ query: { take, skip } });
  }
}
