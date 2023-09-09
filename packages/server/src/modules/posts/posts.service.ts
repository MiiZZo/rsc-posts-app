import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPost } from './posts.entity';
import * as config from './posts.config';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>
  ) {}

  async createOne({ body, title, userId }: config.CreateOnePostBody & { userId: string }): Promise<config.CreateOnePostRespones> {
    const post = await this.postsRepository.save(
      await this.postsRepository.create({ title, body, user: { id: userId }, })
    );

    return (
      await this.postsRepository.findOne({
        where: { id: post.id },
        select: { userId: false },
        relations: { user: true },
      })
    )!;
  }

  async findOne({ id }: config.GetOneParams) {
    const post = await this.postsRepository.findOne({ where: { id }, select: { userId: false }, relations: { user: true } });

    return post;
  }

  async findMany({ query: { take, skip } }: config.GetManyParams) {
    const [posts, count] = await this.postsRepository.findAndCount({ take, skip, relations: { user: true }, order: { createdAt: 'DESC' } });

    return {
      posts,
      count,
    };
  }
}
