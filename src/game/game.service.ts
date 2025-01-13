import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game, Word } from './entities/game.entity';
import { readFileSync } from 'fs';
import { ApiContinueResponse } from '@nestjs/swagger';
import { ProfilingLevel } from 'typeorm';



@Injectable()
export class GameService {

  create(createGameDto: CreateGameDto): Game {

    const g: Game = new Game();
    const EMPTY_CHARACTER = '0';

    g.seed = Math.random().toString();
    let seedrandom = require('seedrandom');
    seedrandom(g.seed, {global: true});
    g.seed = Math.random().toString();

    // set grid size
    let nwords = 8;
    g.gridsize = {
      x: 8, y: 8
    }

    // initialize grid
    let rows = [];
    for( let n = 0; n < g.gridsize.y; n++ ) {
      let acol = [];
      for( let m = 0;  m < g.gridsize.x; m++ ) {
        acol.push(EMPTY_CHARACTER);
      }
      rows.push(acol);
    }
    g.grid = rows;

    // read word files, take #nwords from it.
    let wl = [];
    const fw = readFileSync('res/words.txt', 'utf8');
    wl = fw.split('\n');
    //g.wordlist = [...wl];

    let ws = [];
    for( let n = 0; n < nwords; n++ ) {
      ws.push(wl.splice(Math.floor(Math.random() * wl.length), 1)[0]);
    }

    let directions = [0, 1, 2, 3, 4, 5, 6, 7]; //'N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'
    let direction_progresses = [
      [ 0, -1], // 0:'N'
      [ 1, -1], // 1:'NW'
      [ 1,  0], // 2:' W'
      [ 1,  1], // 3:'SW'
      [ 0,  1], // 4:'S'
      [-1,  1], // 5:'SE'
      [-1,  0], // 6:' E'
      [-1, -1], // 7:'NE'
    ]

    g.wordlist = [];
    g.words = [];
    // place words
    ws.forEach(w => {
      // try 10 times.
      let isPlaced = false;
      for( let t = 0; t < 10; t++ ) {
        if(isPlaced) break;
        // pick a position first.
        let wx = Math.floor(Math.random() * g.gridsize.x);
        let wy = Math.floor(Math.random() * g.gridsize.y);
        
        // try all the direction in random order.
        let direction_candidates = [...directions];
        for( let d = 0; d < direction_candidates.length; d++ ) {
          let dc = direction_candidates.splice(Math.floor(Math.random() * direction_candidates.length), 1)[0];
          let da = direction_progresses[dc]; // [X, Y] progression
          if((wx + da[0] * w.length) > g.gridsize.x || (wx + da[0] * w.length) < 0) continue;
          if((wy + da[1] * w.length) > g.gridsize.y || (wy + da[1] * w.length) < 0) continue;
          // check if there's a charecter on the way
          let unplacable_direction = 0;
          for( let i = 0; i < w.length; i++ ) {
            let cx = wx + (da[0] * i);
            let cy = wy + (da[1] * i);
            if((g.grid[cx][cy] != EMPTY_CHARACTER) && (g.grid[cx][cy] != w[i])) {
              unplacable_direction = 1;
            }
          }
          // place
          if(!unplacable_direction) {
            for( let i = 0; i < w.length; i++ ) {
              let cx = wx + (da[0] * i);
              let cy = wy + (da[1] * i);
              g.grid[cx][cy] = w[i];
            }
            g.wordlist.push(w);
            g.words.push({
              "word" : w,
              "direction" : dc,
              "start" : { "y": wx, "x": wy },
              "end"   : { "y": wx + da[0] * (w.length-1), "x": wy + da[1] * (w.length-1) }
            })
            isPlaced = true;
            break;
          }
        }
      }
    });
    
    let rc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( let n = 0; n < g.gridsize.y; n++ ) {
      for( let m = 0; m < g.gridsize.x; m++ ) {
        if(g.grid[m][n] == EMPTY_CHARACTER) {
          g.grid[m][n] = rc[Math.floor(Math.random() * rc.length)];
        }
      }
    }



    /*
    w.start.x = 10;
    w.start.y = 11;
    w.end.x = 20;
    w.end.y = 21;
    w.direction = 1;
    w.word = g.wordlist[0];
    */
    //words.push(w)
    //g.words = ws;
    return g;

    return Object.assign(
      {
      "seed": "123938123",
      "grid": [
          ["A", "B", "C", "D", "E", "A", "D", "H"],
          ["B", "C", "O", "L", "U", "M", "N", "A"],
          ["C", "D", "L", "A", "D", "A", "R", "A"],
          ["D", "E", "D", "A", "R", "A", "A", "E"],
          ["E", "F", "B", "A", "I", "A", "V", "A"],
          ["F", "G", "O", "A", "A", "A", "A", "S"],
          ["G", "H", "Y", "A", "C", "A", "S", "T"],
          ["H", "I", "A", "A", "A", "K", "E", "A"],
        ],
      "gridsize": {
        "x": 8,
        "y": 8
        },
      "wordlist": ["COLUMN", "COLD", "BACK"],
      "words": [
        {
          "word": "COLUMN",
          "direction": 0,
          "start": { "x": 1, "y": 1 },
          "end": {"x": 6, "y": 1 },
        },
        {
          "word": "COLD",
          "direction": 4,
          "start": { "x": 2, "y": 0 },
          "end": {"x": 2, "y": 3 },
        },
        {
          "word": "BACK",
          "direction": 3,
          "start": { "x": 2, "y": 4 },
          "end": {"x": 5, "y": 7 },
        },
        ]
      }
    );
    /*
    return Object.assign({
      id: "uuid here maybe"
    });
    */
  }
}
