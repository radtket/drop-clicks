import React, { Fragment, useState } from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import axios from 'axios';

import Overlay from './Overlay';
import HighScores from './HighScores';

import { getHighScores } from '../utils/local-storage';
import HighScoreFragment from './HighScoreFragment';
import { checkHighScore, createNewHighScores } from '../utils/helpers';

const getInitalState = ({ score, gameType }) => {
  const initials = localStorage.getItem('initials') || '';
  const highscores = getHighScores();
  const isHighScore = checkHighScore(score, highscores[gameType]);
  return {
    highscores,
    isHighScore,
    initials,
    submitted: false,
    highscoresLocal: null,
    highscoresGlobal: null,
    globalPlace: null,
    globalPlays: null,
  };
};

const GameOver = ({
  bestGroup,
  gameType,
  level,
  resetGame,
  restartGame,
  rotation,
  score,
}) => {
  const [state, setState] = useState(getInitalState({ score, gameType }));

  const createScoreObj = ({ initials }) => {
    return {
      score,
      initials,
      level,
      bestGroup,
      date: DateTime.local().toISO(),
    };
  };

  // This should return an identical object,
  const updateLocalHighScores = ({ highscores, initials }) => {
    const newHighScores = createNewHighScores(
      createScoreObj({ initials }),
      highscores[gameType]
    );

    localStorage.setItem(
      'scores',
      JSON.stringify({
        ...highscores,
        [gameType]: newHighScores,
      })
    );

    localStorage.setItem('initials', initials);

    return newHighScores;
  };

  const {
    globalPlace,
    globalPlays,
    highscores,
    highscoresGlobal,
    highscoresLocal,
    initials,
    isHighScore,
    submitted,
  } = state;

  return (
    <Overlay highScore={submitted} rotation={rotation}>
      {submitted ? (
        <HighScores
          {...{
            currentInitials: initials,
            currentScore: score,
            gameType,
            globalPlace,
            globalPlays,
            highscoresGlobal,
            highscoresLocal,
            restartGame,
            scores: highscores.original,
          }}
        />
      ) : (
        <>
          <h2>Game Over</h2>
          <h3 className="final-score">Score: {score}</h3>
          <HighScoreFragment
            {...{
              handleChange: ({ target }) => {
                setState(prev => {
                  return { ...prev, initials: target.value.toUpperCase() };
                });
              },
              handleSubmit: async () => {
                if (initials.length > 1) {
                  const res = await axios.post(
                    'https://wcs0oio6th.execute-api.us-east-1.amazonaws.com/dev/score',
                    { ...createScoreObj(state), type: gameType }
                  );

                  setState(prev => {
                    const newHighScores = updateLocalHighScores(prev);
                    return {
                      ...prev,
                      submitted: true,
                      // Shouldn't be used.
                      highscoresLocal: newHighScores,
                      highscoresGlobal: res.data.top10,
                      globalPlace: res.data.place,
                      globalPlays: res.data.total,
                    };
                  });
                }
              },
              initials,
              isHighScore,
              resetGame,
            }}
          />
        </>
      )}
    </Overlay>
  );
};

GameOver.propTypes = {
  bestGroup: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  restartGame: PropTypes.func.isRequired,
  rotation: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default GameOver;
