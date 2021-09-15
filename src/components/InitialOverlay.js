import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';
import HighScores from './HighScores';
import { getHighScores } from '../utils/local-storage';
import { ButtonHighScore, ButtonPlayGameType } from './Buttons';

const InitialOverlay = ({ restartGame }) => {
  const [state, setState] = useState({
    showHighScore: false,
    gameType: 'original',
  });

  return (
    <Overlay highScore={state.showHighScore} noAnimation>
      {!state.showHighScore ? (
        <>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <ButtonPlayGameType
              {...{ restartGame, gameType: 'original', hasIcon: true }}
            />
          </div>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <ButtonPlayGameType
              {...{ restartGame, gameType: 'puzzle', hasIcon: true }}
            />
          </div>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <ButtonHighScore {...{ setState, gameType: 'original' }} />
          </div>
          <div className="button-wrapper">
            <ButtonHighScore {...{ setState, gameType: 'puzzle' }} />
          </div>
        </>
      ) : (
        <HighScores
          gameType={state.gameType}
          restartGame={restartGame}
          scores={getHighScores().original}
        />
      )}
    </Overlay>
  );
};

InitialOverlay.propTypes = {
  restartGame: PropTypes.func.isRequired,
};

export default InitialOverlay;
