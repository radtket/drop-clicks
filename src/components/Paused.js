import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import { ButtonPlayGameType } from './Buttons';

const Paused = ({ rotation, resumeGame, restartGame }) => {
  return (
    <Overlay noAnimation rotation={rotation}>
      <h2>Game Paused</h2>
      <div className="paused-button-wrapper">
        <button className="btn" onClick={resumeGame} type="button">
          Resume
        </button>
      </div>
      <div className="paused-button-wrapper">
        <ButtonPlayGameType {...{ restartGame, gameType: 'original' }} />
      </div>
      <div className="paused-button-wrapper">
        <ButtonPlayGameType {...{ restartGame, gameType: 'puzzle' }} />
      </div>
    </Overlay>
  );
};

Paused.propTypes = {
  rotation: PropTypes.number.isRequired,
  resumeGame: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
};

export default Paused;
