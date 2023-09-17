import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(
    username: string,
    plainPassword: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({ where: { username } });
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

  async createUser(username: string, plainPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return await this.userRepository.save({
      username,
      password: hashedPassword,
    });
  }
}
