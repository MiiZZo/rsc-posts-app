import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PostComment } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostComment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, ConfigService, JwtService],
  exports: [TypeOrmModule],
})
export class CommentsModule {}
