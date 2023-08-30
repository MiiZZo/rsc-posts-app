import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostComment } from './comments.entity';
import * as config from './posts.config';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostComment)
    private commentsRepository: Repository<PostComment>
  ) {}

  async createOne({ id, userId, body }: config.CreateOnePayload & { userId: string }): Promise<config.CreateOneResponses> {
    return await this.commentsRepository.save(
      this.commentsRepository.create({
        body,
        
      })
    )
  }
}
