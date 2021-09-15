import { HIGH_SCORES_KEPT } from './constants';
import { get_levels } from './logic-levels';

export const getElapsedTime = ({ level, startTime, gameType }) => {
  const LEVELS = get_levels(gameType);
  const currentTime = new Date().getTime();

  const levelTime = LEVELS[level].time * 1000;
  const elapsedTime = currentTime - startTime;

  return Math.min(elapsedTime, levelTime * 1000);
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
