import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from '../entities/link.entity';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService],
  controllers: [LinkController],
})
export class UserModule {}
