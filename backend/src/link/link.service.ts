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

  async getLink(id: number): Promise<Link> {
    return await this.linkRepository.findOneBy({ id });
  }
  async deleteLink(id: number): Promise<void> {
    const link = await this.linkRepository.findOneBy({ id });
    if (link) {
      link.deletedAt = new Date();
      this.linkRepository.save(link);
    }
  }
}
