export const GAME_SIZE = window.innerWidth > 599 ? 500 : 300;

export const GAME_STYLE = {
  height: `${GAME_SIZE}px`,
  width: `${GAME_SIZE}px`,
};

export const ENCOURAGEMENT = [
  'You Rock!',
  'Keep it up!',
  'Wowee!',
  'Congratulations!',
  "I'm impressed!",
  'Fantastic!',
  'Absolutely stellar!',
  'Way to go!',
];

export const HIGH_SCORES_KEPT = 10;

export const GAME_TYPE_ORIGINAL = 'original';

export const GAME_TYPE_PUZZLE = 'puzzle';

export const LEVELS_ENUM = {
  [GAME_TYPE_ORIGINAL]: [
    // Math done in my head...could...be wrong.
    { dim: 4, colors: 2, time: 20, movesLeft: 3 }, // 8
    { dim: 5, colors: 2, time: 20, movesLeft: 3 }, // 12.5
    { dim: 6, colors: 2, time: 20, movesLeft: 3 }, // 18
    { dim: 6, colors: 3, time: 30, movesLeft: 3 }, // Average 12 per color
    { dim: 7, colors: 3, time: 30, movesLeft: 3 }, // 16.33
    { dim: 8, colors: 3, time: 30, movesLeft: 3 }, // 21.33
    { dim: 9, colors: 3, time: 30, movesLeft: 3 }, // 27
    { dim: 8, colors: 4, time: 40, movesLeft: 3 }, // 16
    { dim: 9, colors: 4, time: 40, movesLeft: 3 }, // 20.25
    { dim: 10, colors: 4, time: 40, movesLeft: 3 }, // 25
    { dim: 11, colors: 4, time: 30, movesLeft: 3 }, // 30.25
    { dim: 12, colors: 4, time: 30, movesLeft: 3 }, // 36
    // { dim: 13, colors: 4, time: 10, movesLeft: 3 }, // 42.25
    // { dim: 14, colors: 4, time: 30, movesLeft: 3 } // 48
  ],
  [GAME_TYPE_PUZZLE]: [
    { dim: 4, colors: 2, time: 20, movesLeft: 3 }, // 8
    { dim: 5, colors: 2, time: 20, movesLeft: 3 }, // 12.5
    { dim: 6, colors: 2, time: 20, movesLeft: 3 }, // 18
    { dim: 6, colors: 3, time: 30, movesLeft: 3 }, // Average 12 per color
    { dim: 7, colors: 3, time: 30, movesLeft: 3 }, // 16.33
    { dim: 8, colors: 3, time: 30, movesLeft: 3 }, // 21.33
    { dim: 9, colors: 3, time: 30, movesLeft: 3 }, // 27
    { dim: 8, colors: 4, time: 40, movesLeft: 3 }, // 16
    { dim: 9, colors: 4, time: 40, movesLeft: 3 }, // 20.25
    { dim: 10, colors: 4, time: 40, movesLeft: 3 }, // 25
    { dim: 11, colors: 4, time: 30, movesLeft: 3 }, // 30.25
    { dim: 12, colors: 4, time: 30, movesLeft: 3 }, // 36
    { dim: 12, colors: 5, time: 30, movesLeft: 3 }, // ~29
    { dim: 11, colors: 5, time: 30, movesLeft: 3 }, // ~29
    { dim: 10, colors: 5, time: 30, movesLeft: 3 }, // ~29
    { dim: 10, colors: 5, time: 30, movesLeft: 2 }, // ~29
    { dim: 10, colors: 5, time: 30, movesLeft: 1 }, // ~29
    { dim: 10, colors: 5, time: 30, movesLeft: 0 }, // ~29
  ],
};
