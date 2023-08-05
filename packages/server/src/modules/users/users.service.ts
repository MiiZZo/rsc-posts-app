import { FindOneUser } from '@common/types';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  
  async findOne({
    username,
    email,
    id,
  }: FindOneUser) {
    return await this.usersRepository.findOne({ where: { username, email, id } });
  }
}
