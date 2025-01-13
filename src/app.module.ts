import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { HighscoreModule } from './highscore/highscore.module';
import { Highscore } from './highscore/entities/highscore.entity';
import { Game } from './game/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'devpomme',
      username: 'postgres',
      entities: [Highscore, Game],
      database: 'pgWordSearch',
      synchronize: true,
      logging: true,
    }),
    GameModule,
    HighscoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
