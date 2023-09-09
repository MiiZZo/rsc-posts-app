import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from '@modules/posts';
import { UsersModule } from '@modules/users';
import path from 'path';
import { AuthModule } from '@modules/auth';
import { CommentsModule } from '@modules/post-comments';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.development.env')
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: parseInt(configService.getOrThrow('DATABASE_PORT')),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CommentsModule,
    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
