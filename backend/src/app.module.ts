import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { LinkeyConfigModule } from './database/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth/auth.service';
import { Link } from './entities/link.entity';
import { AuthController } from './auth/auth.controller';
import { LinkController } from './link/link.controller';
import { LinkService } from './link/link.service';

@Module({
  imports: [LinkeyConfigModule, TypeOrmModule.forFeature([User, Link])],
  controllers: [AppController, UserController, AuthController, LinkController],
  providers: [AppService, UserService, AuthService, LinkService],
})
export class AppModule {}
