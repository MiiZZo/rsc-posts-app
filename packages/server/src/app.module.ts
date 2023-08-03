import { PostsModule } from '@modules/posts';
import { UsersModule } from '@modules/users';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
