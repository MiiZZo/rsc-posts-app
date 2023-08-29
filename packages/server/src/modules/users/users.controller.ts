import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get('/:username')
  async findOne(
    @Param('username')
    username: string
  ) {
    const user = await this.usersService.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
