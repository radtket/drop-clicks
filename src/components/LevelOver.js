import React from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';
import { isGameOrigional, isLevelComplete } from '../utils/logic-levels';

const LevelOver = ({
  gameType,
  levelBonus,
  pieceBonus,
  timeBonus,
  level,
  rotation,
  goToNextLevel,
}) => {
  const COMPLETED = isLevelComplete({ level, gameType });

  return (
    <Overlay rotation={rotation}>
      <h2>{COMPLETED ? 'Game Completed!' : `Level ${level} Completed`}</h2>
      <div className="bonus-wrapper">
        <h3 className="time-bonus">
          {isGameOrigional(gameType) ? 'Time' : 'Level'} Bonus:{' '}
          <span>{isGameOrigional(gameType) ? timeBonus : levelBonus}</span>
        </h3>
        <h3 className="piece-bonus">
          Piece Bonus: <span>{pieceBonus}</span>
        </h3>
        <h3 className="total-score">
          Total Bonus: <span>{timeBonus + pieceBonus + levelBonus}</span>
        </h3>
      </div>
      <div className="next-level" style={{ textAlign: 'center' }}>
        <button className="btn" onClick={goToNextLevel} type="button">
          {COMPLETED ? 'Finish' : 'Next Level'}
        </button>
      </div>
    </Overlay>
  );
};

LevelOver.propTypes = {
  goToNextLevel: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  pieceBonus: PropTypes.number.isRequired,
  levelBonus: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  timeBonus: PropTypes.number.isRequired,
};

export default LevelOver;
