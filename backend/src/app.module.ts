import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PastyConfigModule } from './database/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [PastyConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
