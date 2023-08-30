import { FindOneUser } from '@common/types';
import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  
  async findOne({
    where,
    select
  }: {
    where: Partial<FindOneUser>;
    select?: FindOneOptions<User>['select']
  }) {
    return await this.usersRepository.findOne({ where, select });
  }
}
