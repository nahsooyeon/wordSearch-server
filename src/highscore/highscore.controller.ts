import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HighscoreService } from './highscore.service';
import { CreateHighscoreDto } from './dto/create-highscore.dto';
import { UpdateHighscoreDto } from './dto/update-highscore.dto';

@Controller('highscore')
export class HighscoreController {
  constructor(private readonly highscoreService: HighscoreService) {}

  @Post()
  create(@Body() createHighscoreDto: CreateHighscoreDto) {
    return this.highscoreService.createHighScore(createHighscoreDto);
  }

  @Get()
  findAll() {
    return this.highscoreService.findAllHighScores();
  }

  @Get('/name/:name')
  findAllByName(@Param('name') name: string) {
    return this.highscoreService.findAllHighScoresByName(name);  
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.highscoreService.findOneHighScore(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHighscoreDto: UpdateHighscoreDto) {
    return this.highscoreService.updateHighScore(+id, updateHighscoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highscoreService.removeHighScore(+id);
  }
}
