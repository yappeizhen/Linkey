import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.userService.createUser(email, password);
  }
}
