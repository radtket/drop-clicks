import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Initial from './InitialOverlay';
import Paused from './Paused';
import LevelOver from './LevelOver';
import GameOver from './GameOver';

const Overlays = ({
  bestGroup,
  gameOver,
  gameType,
  goToNextLevel,
  initialized,
  level,
  levelBonus,
  levelOver,
  paused,
  pieceBonus,
  resetGame,
  restartGame,
  resumeGame,
  rotation,
  score,
  timeBonus,
}) => {
  if (!initialized) {
    return <Initial {...{ restartGame }} />;
  }

  if (paused) {
    return <Paused {...{ rotation, resumeGame, restartGame }} />;
  }

  if (gameOver) {
    return (
      <GameOver
        {...{
          bestGroup,
          gameType,
          level,
          resetGame,
          restartGame,
          rotation,
          score,
        }}
      />
    );
  }

  if (levelOver) {
    return (
      <LevelOver
        {...{
          gameType,
          goToNextLevel,
          level: level + 1,
          levelBonus,
          pieceBonus,
          rotation,
          timeBonus,
        }}
      />
    );
  }

  return null;
};

Overlays.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  gameType: PropTypes.string.isRequired,
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

Overlays.defaultProps = {
  levelBonus: 0,
  pieceBonus: 0,
  timeBonus: 0,
};

export default Overlays;
