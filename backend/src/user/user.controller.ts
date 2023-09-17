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
import { AuthService } from '../auth/auth.service';
import { getSafeUser } from '../utils/auth';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  async getUser(@Request() req, @Response() res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No authorization cookie found' });
    }
    let decoded;
    try {
      decoded = this.authService.verifyToken(token);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const userId = decoded.sub;
    try {
      const user = await this.userService.getUser(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ user: getSafeUser(user) });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id/links')
  async getUserLinks(@Param('id') id: number): Promise<Link[]> {
    return await this.userService.getUserLinks(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/links')
  async createNewLink(
    @Request() req,
    @Param('id') userId: number,
    @Body('originalUrl') originalUrl: string,
  ): Promise<Link> {
    if (req.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to create a link for this user',
      );
    }
    return await this.userService.createUserLink(userId, originalUrl);
  }
}
