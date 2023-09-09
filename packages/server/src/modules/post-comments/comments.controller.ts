import { contract } from '@common/contract';
import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Query,
  Req,
  RequestMapping,
  UseGuards,
} from '@nestjs/common';
import { mapRequest } from '@shared/pipes';
import { CommentsService } from './comments.service';
import * as config from './posts.config';
import { AuthGuard } from '@modules/auth';
import { Request } from 'express';

@Controller(contract.comments.path)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @RequestMapping(mapRequest(config.createOne))
  async createOne(
    @Req()
    req: Request,
    @Body()
    { body }: config.CreateOneBody,
    @Param('postId')
    postId: string
  ): Promise<config.CreateOneResponses> {
    return await this.commentsService.createOne({
      body,
      postId,
      userId: req.user!.sub,
    });
  }

  @RequestMapping(mapRequest(config.getMany))
  async getMany(
    @Query('take', ParseIntPipe)
    take: number,
    @Query('skip', ParseIntPipe)
    skip: number,
    @Param('postId')
    postId: string
  ): Promise<config.GetManyResponses> {
    return await this.commentsService.findMany({
      take,
      skip,
      postId,
    });
  }
}
