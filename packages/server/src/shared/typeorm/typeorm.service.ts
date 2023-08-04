import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {

  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      username: this.configService.getOrThrow('DATABASE_USERNAME'),
      password: this.configService.getOrThrow('DATABASE_PASSWORD'),
      port: this.configService.getOrThrow('DATABASE_PORT'),
      database: this.configService.getOrThrow('DATABASE_NAME'),
    };
  }
}
