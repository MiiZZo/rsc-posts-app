import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignIn, SignUp } from '@common/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpResponses } from './auth.config';
import { User } from '@modules/users';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async signIn({ username, password }: SignIn) {
    const user = await this.usersService.findOne({
      where: { username },
      select: { id: true, email: true, username: true, password: true },
    });

    if (user) {
      const passwordsMatched = await bcrypt.compare(password, user.password);

      if (passwordsMatched) {
        const payload = { sub: user.id, username: user.username };

        return {
          accessToken: await this.jwtService.signAsync(payload),
        };
      }
    }

    return null;
  }

  async signUp({
    email,
    password,
    username,
  }: SignUp): Promise<SignUpResponses> {
    const userWithTheSameEmail = await this.usersService.findOne({
      where: { email },
    });

    if (userWithTheSameEmail) {
      return {
        error: {
          type: 'EMAIL_BUSY',
        },
      };
    }

    const userWithTheSameUsername = await this.usersService.findOne({
      where: { username },
    });

    if (userWithTheSameUsername) {
      return {
        error: {
          type: 'USERNAME_BUSY',
        },
      };
    }
    const user = await this.usersRepository.create({
      email,
      password,
      username,
    });
    await this.usersRepository.save(user);

    return {
      result: true,
    };
  }
}
