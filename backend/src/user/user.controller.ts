import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.userService.createUser(username, password);
  }

  @Post('signup')
  async signup(@Request() { username, password }, @Response() res) {
    const jwt = await this.authService.signup(username, password);
    res.cookie('jwt', jwt.access_token, { httpOnly: true });
    res.status(201).send({ message: 'Signed up and logged in' });
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    // Validate user with database, then:
    return {
      access_token: this.authService.createToken(body),
    };
  }

  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('jwt');
    res.status(200).send({ message: 'Logged out' });
  }
}
