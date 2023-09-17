import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { getSafeUser } from '../utils/auth';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private createToken(payload: any) {
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
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) return null;
    const isVerified = await bcrypt.compare(plainPassword, user.password);
    if (!isVerified) {
      return null;
    }
    const safeUser = getSafeUser(user);
    return {
      access_token: this.createToken(safeUser),
      user: safeUser,
    };
  }

  async signup(username: string, plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newUser = await this.userRepository.save({
      username,
      password: hashedPassword,
    });
    const safeUser = getSafeUser(newUser);
    return {
      access_token: this.createToken(safeUser),
      user: safeUser,
    };
  }
}
