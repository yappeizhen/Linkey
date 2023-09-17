import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PastyConfigModule } from '../database/config.module';
import { Link } from '../entities/link.entity';
import { LinkService } from './link.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PastyConfigModule, TypeOrmModule.forFeature([Link])],
      providers: [LinkService],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
