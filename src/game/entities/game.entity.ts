
export interface Word {
    word: string;
    direction: number;
    start: {
        x: number;
        y: number;
    },
    end: {
        x: number;
        y: number;
    }
}

export class Game {
    seed: string;
    grid: string [][];
    gridsize: {
        x: number;
        y: number;
    };    // [8, 8]

    wordlist: string [];
    words: Word [];
}
