import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';
import HighScores from './HighScores';
import { getHighScores } from '../utils/local-storage';
import { ButtonHighScore, ButtonPlayGameType } from './Buttons';
import { GAME_TYPE_ORIGINAL, GAME_TYPE_PUZZLE } from '../utils/constants';

const InitialOverlay = ({ restartGame }) => {
  const [{ gameType, showHighScore }, setState] = useState({
    showHighScore: false,
    gameType: GAME_TYPE_ORIGINAL,
  });

  return (
    <Overlay highScore={showHighScore} noAnimation>
      {!showHighScore ? (
        <>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <ButtonPlayGameType
              {...{ restartGame, gameType: GAME_TYPE_ORIGINAL, hasIcon: true }}
            />
          </div>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <ButtonPlayGameType
              {...{ restartGame, gameType: GAME_TYPE_PUZZLE, hasIcon: true }}
            />
          </div>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <ButtonHighScore {...{ setState, gameType: GAME_TYPE_ORIGINAL }} />
          </div>
          <div className="button-wrapper">
            <ButtonHighScore {...{ setState, gameType: GAME_TYPE_PUZZLE }} />
          </div>
        </>
      ) : (
        <HighScores
          gameType={gameType}
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
