import { GAME_TYPE_ORIGINAL, LEVELS_ENUM } from './constants';
import { createBoard } from './logic-board';

export const isGameOrigional = gameType => {
  return gameType === GAME_TYPE_ORIGINAL;
};

export const getLevels = gameType => {
  return LEVELS_ENUM[gameType];
};

export const getLevelInfo = (level, gameType) => {
  const LEVELS = getLevels(gameType);
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
  return level === getLevels(gameType).length;
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
    bestGroup: 0,
    clicks: 0,
    gameOver: false,
    hasBeenPaused: false,
    lastScore: 0,
    level,
    levelOver: false,
    rotating: false,
    score: 0,
  };
};

export const getTimeBonus = (level, startTime, gameType) => {
  const LEVELS = getLevels(gameType);
  const levelTime = LEVELS[level].time * 1000;
  const currentTime = new Date().getTime();
  const endTime = startTime + levelTime;
  const percentLeft = (endTime - currentTime) / levelTime;

  return Math.max(Math.floor(percentLeft * 1000) * 10, 5);
};
