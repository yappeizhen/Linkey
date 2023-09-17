import { Controller, Get, Param } from '@nestjs/common';
import { Link } from '../entities/link.entity';

import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get(':id')
  async getLink(@Param('id') id: number): Promise<Link> {
    return await this.linkService.getLink(id);
  }
}
