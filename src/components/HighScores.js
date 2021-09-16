import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getHighScores } from '../utils/local-storage';
import Subtitle from './Subtitle';
import HighScoreRow from './HighScoreRow';
import { ButtonPlayGameType } from './Buttons';
import { GAME_TYPE_ORIGINAL, GAME_TYPE_PUZZLE } from '../utils/constants';

const getPlace = ({ scores, currentScore, currentInitials }) => {
  const placeIndex = scores.findIndex(score => {
    return score.score === currentScore && score.initials === currentInitials;
  });

  if (placeIndex !== -1) {
    return placeIndex + 1;
  }
  // No such thing as zero place, right?
  return 0;
};

const getInitialState = ({
  gameType,
  globalPlace,
  currentScore,
  currentInitials,
}) => {
  // get local scores
  const localScores = getHighScores();

  // Determine which to show first
  let showGlobal = true;
  if (currentScore && globalPlace > 10) {
    // Show if it's a local high score, but not global
    if (
      getPlace({ scores: localScores[gameType], currentScore, currentInitials })
    ) {
      showGlobal = false;
    }
  }

  return {
    loading: true,
    localScores,
    showGlobal,
  };
};

const HighScores = ({
  globalPlace,
  globalPlays,
  currentScore,
  currentInitials,
  restartGame,
  gameType,
}) => {
  const [{ showGlobal, globalScores, localScores, loading }, setState] =
    useState(
      getInitialState({
        gameType,
        globalPlace,
        currentScore,
        currentInitials,
      })
    );

  useEffect(() => {
    return axios
      .get('https://wcs0oio6th.execute-api.us-east-1.amazonaws.com/dev/score')
      .then(({ data }) => {
        setState(prev => {
          return { ...prev, loading: false, globalScores: data.scores };
        });
      });
  }, []);

  if (loading) {
    return 'Retrieving Scores...';
  }

  const currentScores = showGlobal
    ? globalScores[gameType]
    : localScores[gameType];

  const place = getPlace({
    scores: currentScores,
    currentScore,
    currentInitials,
  });

  return (
    <>
      <h2>
        <button
          className="highscore-toggle"
          onClick={() => {
            setState(prev => {
              return { ...prev, showGlobal: !prev.showGlobal };
            });
          }}
          type="button"
        >
          <span className="highscore-toggle-arrow">⇣</span>
          {showGlobal ? 'Global' : 'Your'}
        </button>{' '}
        High Scores
      </h2>

      {showGlobal && <Subtitle {...{ place, globalPlace, globalPlays }} />}

      <div className="highscore-wrapper">
        <ol className="highscore-table">
          {currentScores.map((score, i) => {
            return (
              <HighScoreRow
                key={i}
                i={i}
                place={place}
                {...{
                  ...score,
                  isNewScore: Boolean(place && i === place - 1),
                  highscorePlace: i + 1,
                }}
              />
            );
          })}
        </ol>
        {!currentScores.length && (
          <div>
            <p>No scores found.</p>
            <p>Try playing a game!</p>
          </div>
        )}
      </div>

      <div className="btn-wrapper">
        <ButtonPlayGameType
          {...{ restartGame, gameType: GAME_TYPE_ORIGINAL }}
        />
        <ButtonPlayGameType {...{ restartGame, gameType: GAME_TYPE_PUZZLE }} />
      </div>
    </>
  );
};

HighScores.propTypes = {
  currentInitials: PropTypes.string,
  currentScore: PropTypes.number,
  gameType: PropTypes.string.isRequired,
  globalPlace: PropTypes.number,
  globalPlays: PropTypes.number,
  restartGame: PropTypes.func.isRequired,
  scores: PropTypes.array.isRequired,
};

export default HighScores;
