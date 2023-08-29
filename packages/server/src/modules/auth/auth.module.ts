import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@modules/users';
import { UsersService } from '@modules/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '90d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
