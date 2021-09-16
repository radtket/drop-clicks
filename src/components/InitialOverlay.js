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
          <ButtonPlayGameType
            {...{ restartGame, gameType: GAME_TYPE_ORIGINAL, hasIcon: true }}
          />
          <ButtonPlayGameType
            {...{ restartGame, gameType: GAME_TYPE_PUZZLE, hasIcon: true }}
          />
          <ButtonHighScore {...{ setState, gameType: GAME_TYPE_ORIGINAL }} />
          <ButtonHighScore {...{ setState, gameType: GAME_TYPE_PUZZLE }} />
        </>
      ) : (
        <HighScores
          {...{
            gameType,
            restartGame,
            scores: getHighScores().original,
          }}
        />
      )}
    </Overlay>
  );
};

InitialOverlay.propTypes = {
  restartGame: PropTypes.func.isRequired,
};

export default InitialOverlay;
