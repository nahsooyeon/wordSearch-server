import { Module } from '@nestjs/common';
import { HighscoreService } from './highscore.service';
import { HighscoreController } from './highscore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highscore } from './entities/highscore.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Highscore])],
  controllers: [HighscoreController],
  providers: [HighscoreService],
})
export class HighscoreModule {}
