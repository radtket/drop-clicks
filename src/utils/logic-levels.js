import { ORIGINAL_LEVELS, PUZZLE_LEVELS } from './constants';
import { createBoard } from './logic-board';

export const get_levels = gameType => {
  switch (gameType) {
    case 'original':
      return ORIGINAL_LEVELS;
    case 'puzzle':
      return PUZZLE_LEVELS;

    default:
      throw new Error('No game type');
  }
};

export const getLevelInfo = (level, gameType) => {
  const LEVELS = get_levels(gameType);
  const { dim, colors, time, movesLeft } = LEVELS[level];
  return {
    level,
    dim,
    colors,
    movesLeft,
    time,
    rotation: 0,
    board: createBoard(dim, colors),
    startTime: new Date().getTime(),
  };
};

export const isLevelComplete = ({ level, gameType }) => {
  return level === get_levels(gameType).length;
};

export const getNextLevelState = state => {
  const level = state.level + 1;

  if (isLevelComplete({ level, gameType: state.gameType })) {
    const score =
      state.score + state.pieceBonus + state.timeBonus + state.levelBonus;

    return { gameOver: true, levelOver: false, score, level };
  }

  const levelInfo = getLevelInfo(level, state.gameType);
  return {
    ...levelInfo,
    hasBeenPaused: false,
    elapsedTime: 0,
    levelOver: false,
    lastScore: state.pieceBonus + state.timeBonus + state.levelBonus,
    score: state.score + state.pieceBonus + state.timeBonus + state.levelBonus,
  };
};

export const newGameState = gameType => {
  const level = 0;
  const levelInfo = getLevelInfo(level, gameType);

  return {
    ...levelInfo,
    clicks: 0,
    bestGroup: 0,
    score: 0,
    level: 0,
    levelOver: false,
    gameOver: false,
    rotating: false,
    hasBeenPaused: false,
    lastScore: 0,
  };
};

export const getTimeBonus = (level, startTime, gameType) => {
  const LEVELS = get_levels(gameType);
  const levelTime = LEVELS[level].time * 1000;
  const currentTime = new Date().getTime();
  const endTime = startTime + levelTime;
  const percentLeft = (endTime - currentTime) / levelTime;

  return Math.max(Math.floor(percentLeft * 1000) * 10, 5);
};
