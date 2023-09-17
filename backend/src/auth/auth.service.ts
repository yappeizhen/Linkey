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

  async login(email: string, plainPassword: string) {
    const user = await this.userService.validateUser(email, plainPassword);
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.createToken(payload),
      };
    }
    return null;
  }

  async signup(email: string, plainPassword: string) {
    const newUser = await this.userService.createUser(email, plainPassword);
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      access_token: this.createToken(payload),
    };
  }
}
