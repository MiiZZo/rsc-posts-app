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

  async createOne({ postId, userId, body }: config.CreateOnePayload & { userId: string }): Promise<config.CreateOneResponses> {
    const comment = await this.commentsRepository.save(
      this.commentsRepository.create({
        body,
        post: {
          id: postId,
        },
        user: {
          id: userId
        }
      })
    );

    return (await this.commentsRepository.findOne({ where: { id: comment.id }, relations: { user: true } }))!;
  }

  async findMany({ postId, skip, take }: config.GetManyPayload): Promise<config.GetManyResponses> {
    const [comments, count] = await this.commentsRepository.findAndCount({
      where: {
        post: {
          id: postId,
        },
      },
      relations: {
        user: true,
      },
      take,
      skip,
      order: {
        createdAt: 'DESC'
      }
    });

    return {
      comments,
      count,
    };
  }
}
