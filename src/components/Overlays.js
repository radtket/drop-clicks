import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Initial from './InitialOverlay';
import Paused from './Paused';
import LevelOver from './LevelOver';
import GameOver from './GameOver';

const Overlays = props => {
  const {
    gameType,
    gameOver,
    goToNextLevel,
    initialized,
    level,
    levelBonus,
    levelOver,
    paused,
    pieceBonus,
    restartGame,
    resumeGame,
    rotation,
    timeBonus,
  } = props;
  if (!initialized) {
    return <Initial restartGame={restartGame} />;
  }

  if (paused) {
    return (
      <Paused
        restartGame={restartGame}
        resumeGame={resumeGame}
        rotation={rotation}
      />
    );
  }
  if (gameOver) {
    return <GameOver {...props} />;
  }
  if (levelOver) {
    return (
      <LevelOver
        gameType={gameType}
        goToNextLevel={goToNextLevel}
        level={level + 1}
        levelBonus={levelBonus}
        pieceBonus={pieceBonus}
        rotation={rotation}
        timeBonus={timeBonus}
      />
    );
  }

  return null;
};

Overlays.propTypes = {
  gameType: PropTypes.string.isRequired,
  gameOver: PropTypes.bool.isRequired,
  goToNextLevel: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  levelBonus: PropTypes.number,
  levelOver: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  pieceBonus: PropTypes.number,
  resetGame: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
  resumeGame: PropTypes.func.isRequired,
  rotation: PropTypes.number.isRequired,
  timeBonus: PropTypes.number,
};

export default Overlays;
