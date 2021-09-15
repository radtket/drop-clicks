import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';
import HighScores from './HighScores';
import { getHighScores } from '../utils/local-storage';

const InitialOverlay = ({ restartGame }) => {
  const [state, setState] = useState({
    showHighScore: false,
    gameType: 'original',
  });

  const style = {
    fontSize: '1.4em',
    margin: 0,
    padding: '1.175em 1.125em',
    textAlign: 'center',
    width: '220px',
  };

  return (
    <Overlay highScore={state.showHighScore} noAnimation>
      {!state.showHighScore ? (
        <>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <button
              className="btn"
              onClick={restartGame('original')}
              style={style}
              type="button"
            >
              Play Original
              <i className="fa fa-clock" style={{ marginLeft: '0.2em' }} />
            </button>
          </div>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <button
              className="btn"
              onClick={restartGame('puzzle')}
              style={style}
              type="button"
            >
              Play Puzzle
              <i
                className="fa fa-puzzle-piece"
                style={{ marginLeft: '0.2em' }}
              />
            </button>
          </div>
          <div className="button-wrapper" style={{ marginBottom: '3em' }}>
            <button
              className="btn"
              onClick={() => {
                setState({
                  showHighScore: true,
                  gameType: 'original',
                });
              }}
              style={style}
              type="button"
            >
              High Scores
              <i className="fa fa-clock" style={{ marginLeft: '0.2em' }} />
            </button>
          </div>
          <div className="button-wrapper">
            <button
              className="btn"
              onClick={() => {
                setState({
                  showHighScore: true,
                  gameType: 'puzzle',
                });
              }}
              style={style}
              type="button"
            >
              High Scores
              <i
                className="fa fa-puzzle-piece"
                style={{ marginLeft: '0.2em' }}
              />
            </button>
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
