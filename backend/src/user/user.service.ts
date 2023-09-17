import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    if (await bcrypt.compare(plainPassword, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Exclude password field from the returned user object
      return result;
    }

    throw new Error('Incorrect password');
  }

  async createUser(email: string, plainPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return await this.userRepository.save({
      email,
      password: hashedPassword,
    });
  }

  async login(email: string, plainPassword: string) {
    const user = await this.validateUser(email, plainPassword);
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.authService.createToken(payload),
      };
    }
    return null;
  }

  async signup(email: string, plainPassword: string) {
    const newUser = await this.createUser(email, plainPassword);
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      access_token: this.authService.createToken(payload),
    };
  }
}
