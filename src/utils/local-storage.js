import { newGameState } from './logic-levels';

export const getInitalBoardState = () => {
  return (
    JSON.parse(localStorage.getItem('board-state')) || {
      initialized: false,
      gameType: 'original',
      ...newGameState('original'),
      // So timer isn't active
      gameOver: true,
      paused: false,
    }
  );
};

const defaultScores = {
  original: [],
  puzzle: [],
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
  return defaultScores;
};

export const saveState = state => {
  // Don't need the animation to replay...
  state.lastScore = 0;

  if (state.levelOver) {
    // Lets grab the next level
  }
  localStorage.setItem('board-state', JSON.stringify(state));
};
