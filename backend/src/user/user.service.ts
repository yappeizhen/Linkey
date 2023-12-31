import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Link } from '../entities/link.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserLinks(id: number): Promise<Link[]> {
    const res = await this.linkRepository
      .createQueryBuilder('link')
      .where('link.userId = :userId', { userId: id })
      .andWhere('link.deletedAt IS NULL')
      .getMany();
    return res;
  }

  async createUserLink(userId: number, originalUrl: string): Promise<Link> {
    return await this.linkRepository.save({ originalUrl, userId });
  }
}
