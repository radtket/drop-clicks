import { HIGH_SCORES_KEPT } from './constants';
import { getLevels } from './logic-levels';

export const getElapsedTime = ({ level, startTime, gameType }) => {
  const LEVELS = getLevels(gameType);
  const CURRENT_TIME = new Date().getTime();

  const LEVEL_TIME = LEVELS[level].time * 1000;
  const ELAPSED_TIME = CURRENT_TIME - startTime;

  return Math.min(ELAPSED_TIME, LEVEL_TIME * 1000);
};

export const checkHighScore = (score, highscores) => {
  if (highscores.length < HIGH_SCORES_KEPT) {
    return true;
  }

  // should be unnecessary
  highscores.sort((scoreA, scoreB) => {
    return scoreB.score - scoreA.score;
  });

  return highscores[HIGH_SCORES_KEPT - 1].score < score;
};

export const createNewHighScores = (scoreObj, highScores) => {
  highScores.push(scoreObj);
  highScores.sort((scoreA, scoreB) => {
    return scoreB.score - scoreA.score;
  });

  return highScores.slice(0, HIGH_SCORES_KEPT);
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
