import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPost } from './posts.entity';
import { CreateOnePost, RemoveOnePost, UpdateOnePost, GetOnePost } from '@common/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>
  ) {}

  async getOne({ id }: GetOnePost) {
    return await this.postsRepository.findOne({ where: { id } });
  }

  async createOne({ body, title, userId }: CreateOnePost) {
    const user = await this.postsRepository.create({ title, body, user: { id: userId } });
    return await this.postsRepository.save(user) as Omit<UserPost, 'user'>;
  }

  async removeOne({ id }: RemoveOnePost) {
    return await this.postsRepository.delete(id);
  }

  async updateOne({ id, post }: UpdateOnePost & { id: string }) {
    return await this.postsRepository.update(id, post);
  }
}
