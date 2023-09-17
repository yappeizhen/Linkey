import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() { username, password }, @Response() res) {
    try {
      const { access_token, user } = await this.authService.signup(
        username,
        password,
      );
      res.cookie('jwt', access_token, { httpOnly: true });
      res.status(201).send({ user, message: 'Signed up and logged in' });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  }

  @Post('login')
  async login(@Body() { username, password }, @Response() res) {
    try {
      const { access_token, user } = await this.authService.login(
        username,
        password,
      );
      res.cookie('jwt', access_token, { httpOnly: true });
      res.status(201).send({ user, message: 'Logged in' });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  }

  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('jwt');
    res.status(200).send({ message: 'Logged out' });
  }
}
