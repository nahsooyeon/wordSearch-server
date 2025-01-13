import { Test, TestingModule } from '@nestjs/testing';
import { HighscoreController } from './highscore.controller';
import { HighscoreService } from './highscore.service';

describe('HighscoreController', () => {
  let controller: HighscoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighscoreController],
      providers: [HighscoreService],
    }).compile();

    controller = module.get<HighscoreController>(HighscoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
