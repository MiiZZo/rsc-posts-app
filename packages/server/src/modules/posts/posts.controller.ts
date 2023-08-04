import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateOnePost, UpdateOnePost } from '@common/types';

@Controller('/posts')
export class PostsController {
  constructor(
    private postsService: PostsService
  ) {}

  @Get('/:id')
  async getOne(
    @Param('id')
    id: string
  ) {
    const post = await this.postsService.getOne({ id });

    if (!post) {
      throw new NotFoundException();
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
