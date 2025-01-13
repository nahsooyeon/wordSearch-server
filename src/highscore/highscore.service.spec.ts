import { Test, TestingModule } from '@nestjs/testing';
import { HighscoreService } from './highscore.service';

describe('HighscoreService', () => {
  let service: HighscoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighscoreService],
    }).compile();

    service = module.get<HighscoreService>(HighscoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
