import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  createToken(payload: any) {
    const secretKey = this.configService.get<string>('SECRET_KEY');
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string) {
    const secretKey = this.configService.get<string>('SECRET_KEY');
    try {
      return jwt.verify(token, secretKey);
    } catch (e) {
      return null;
    }
  }

  async login(username: string, plainPassword: string) {
    const user = await this.userService.validateUser(username, plainPassword);
    if (user) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.createToken(payload),
      };
    }
    return null;
  }

  async signup(username: string, plainPassword: string) {
    const newUser = await this.userService.createUser(username, plainPassword);
    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: this.createToken(payload),
    };
  }
}
