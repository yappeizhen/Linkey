import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from '../entities/link.entity';
import { LinkService } from './link.service';
import { LinkeyConfigModule } from '../database/config.module';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LinkeyConfigModule, TypeOrmModule.forFeature([Link])],
      providers: [LinkService],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
