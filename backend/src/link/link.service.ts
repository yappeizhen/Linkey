import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  private async findOne(id: number): Promise<Link> {
    return await this.linkRepository
      .createQueryBuilder('link')
      .where('id = :linkId', { linkId: id })
      .andWhere('link.deletedAt IS NULL')
      .getOne();
  }

  async getLink(id: number): Promise<Link> {
    return await this.findOne(id);
  }

  async deleteLink(id: number): Promise<void> {
    const link = await this.findOne(id);
    if (link) {
      link.deletedAt = new Date();
      this.linkRepository.save(link);
    }
  }
}
