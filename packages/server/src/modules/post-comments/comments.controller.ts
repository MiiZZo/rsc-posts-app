import { contract } from '@common/contract';
import { Body, Controller, Param, Req, RequestMapping, UseGuards } from '@nestjs/common';
import { mapRequest } from '@shared/pipes';
import { CommentsService } from './comments.service';
import * as config from './posts.config';
import { AuthGuard } from '@modules/auth';
import { Request } from 'express';

@Controller(contract.comments.path)
export class CommentsController {
  constructor(
    private commentsService: CommentsService
  ) {}

  
  @UseGuards(AuthGuard)
  @RequestMapping(mapRequest(config.createOne))
  async getOne(
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
}
