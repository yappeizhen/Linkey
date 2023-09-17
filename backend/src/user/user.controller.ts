import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Link } from '../entities/link.entity';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { getSafeUser } from '../utils/auth';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/whoami')
  async getUser(@Request() req, @Response() res) {
    if (req.user.id)
      try {
        const user = await this.userService.getUser(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user: getSafeUser(user) });
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    return null;
  }

  @Get(':id/links')
  async getUserLinks(@Param('id') id: number): Promise<Link[]> {
    return await this.userService.getUserLinks(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/links')
  async createNewLink(
    @Request() req,
    @Body('originalUrl') originalUrl: string,
  ): Promise<Link> {
    if (!req.user.id) {
      throw new UnauthorizedException(
        'You are not authorized to create a link for this user',
      );
    }
    return await this.userService.createUserLink(req.user.id, originalUrl);
  }
}
