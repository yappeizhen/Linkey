import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Link } from '../entities/link.entity';

import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get(':id')
  async getLink(@Param('id') id: number): Promise<Link> {
    return await this.linkService.getLink(id);
  }

  @Post(':linkId')
  async deleteLink(@Request() req, @Param('linkId') linkId: number) {
    const userId = req.user.id; // Assuming `req.user` holds the authenticated user information
    const link = await this.linkService.getLink(linkId);
    if (link.userId !== userId) {
      throw new UnauthorizedException(
        'Unauthorised: only the creator of this link can delete it',
      );
    }
    await this.linkService.deleteLink(linkId);
    return {
      message: 'Link successfully deleted',
    };
  }
}
