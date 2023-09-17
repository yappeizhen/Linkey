import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { Link } from '../entities/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Link])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
