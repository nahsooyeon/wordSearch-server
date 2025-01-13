import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import { UpdateHighscoreDto } from './dto/update-highscore.dto';
import { Highscore } from './entities/highscore.entity';

@Injectable()
export class HighscoreService {

  constructor(
    @InjectRepository(Highscore) private readonly highscoreRepository: Repository<Highscore>,
  ) {}

  createHighScore(createHighscoreDto: CreateHighscoreDto): Promise<Highscore> {
    const hs: Highscore = new Highscore();
    hs.id = createHighscoreDto.id ?? -1;
    hs.name = createHighscoreDto.name ?? "noname";
    hs.score = createHighscoreDto.score;
    return this.highscoreRepository.save(hs);
  }

  findAllHighScores(): Promise<Highscore[]> {
    return this.highscoreRepository.find({
      take: 30,
      order: {
          id: "ASC",
          score: "DESC"
      }
    });
  }

  findAllHighScoresByName(name: string): Promise<Highscore[]> {
    return this.highscoreRepository.findBy({ name });
  }

  findOneHighScore(id: number): Promise<Highscore>  {
    return this.highscoreRepository.findOneBy({ id });
  }

  updateHighScore(id: number, updateHighscoreDto: UpdateHighscoreDto): Promise<Highscore> {
    const hs: Highscore = new Highscore();
    hs.id = updateHighscoreDto.id;
    hs.name = updateHighscoreDto.name;
    hs.score = updateHighscoreDto.score;
    return this.highscoreRepository.save(hs);
  }

  removeHighScore(id: number): Promise<{affected?: number}> {
    return this.highscoreRepository.delete(id);
  }
}
