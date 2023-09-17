import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Link } from '../entities/link.entity';

import { LinkService } from './link.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('links')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get(':id')
  async getLink(@Param('id') id: number): Promise<Link> {
    return await this.linkService.getLink(id);
  }

  @UseGuards(AuthGuard)
  @Post(':linkId/delete')
  async deleteLink(@Request() req, @Param('linkId') linkId: number) {
    const userId = req.user?.id;
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
