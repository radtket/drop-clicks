import { GAME_TYPE_ORIGINAL } from './constants';
import { newGameState } from './logic-levels';

export const getInitalBoardState = () => {
  return (
    JSON.parse(localStorage.getItem('board-state')) || {
      initialized: false,
      gameType: GAME_TYPE_ORIGINAL,
      ...newGameState(GAME_TYPE_ORIGINAL),
      // So timer isn't active
      gameOver: true,
      paused: false,
    }
  );
};

export const getHighScores = () => {
  const scores = localStorage.getItem('scores');

  if (scores) {
    const parsedScores = JSON.parse(scores);
    // Previous versions will not have a puzzle array
    if (!parsedScores.puzzle) {
      parsedScores.puzzle = [];
    }
    return parsedScores;
  }

  return {
    original: [],
    puzzle: [],
  };
};

export const saveState = state => {
  const copy = { ...state };

  // Don't need the animation to replay...
  copy.lastScore = 0;

  if (copy.levelOver) {
    // Lets grab the next level
  }

  localStorage.setItem('board-state', JSON.stringify(copy));
};
