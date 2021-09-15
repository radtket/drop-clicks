import React, { Component, Fragment } from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import axios from 'axios';

import Overlay from './Overlay';
import HighScores from './HighScores';

import { getHighScores } from '../utils/local-storage';
import HighScoreFragment from './HighScoreFragment';
import { checkHighScore, createNewHighScores } from '../utils/helpers';

class GameOver extends Component {
  constructor(props) {
    super(props);
    const initials = localStorage.getItem('initials') || '';
    const highscores = getHighScores();
    const isHighScore = checkHighScore(props.score, highscores[props.gameType]);

    this.state = {
      highscores,
      isHighScore,
      initials,
    };
  }

  // This should return an identical object,
  updateLocalHighScores = () => {
    const { gameType } = this.props;
    const { highscores, initials } = this.state;

    const newHighScores = createNewHighScores(
      this.createScoreObj(),
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

  render() {
    const {
      globalPlace,
      globalPlays,
      highscores,
      highscoresGlobal,
      highscoresLocal,
      initials,
      isHighScore,
      submitted,
    } = this.state;

    const {
      bestGroup,
      gameType,
      level,
      resetGame,
      restartGame,
      rotation,
      score,
    } = this.props;

    return (
      <Overlay highScore={submitted} rotation={rotation}>
        {submitted ? (
          <HighScores
            currentInitials={initials}
            currentScore={score}
            gameType={gameType}
            globalPlace={globalPlace}
            globalPlays={globalPlays}
            highscoresGlobal={highscoresGlobal}
            highscoresLocal={highscoresLocal}
            restartGame={restartGame}
            scores={highscores.original}
          />
        ) : (
          <>
            <h2>Game Over</h2>
            <h3 className="final-score">Score: {score.toLocaleString()}</h3>
            <HighScoreFragment
              {...{
                handleChange: e => {
                  this.setState({ initials: e.target.value.toUpperCase() });
                },
                handleSubmit: async () => {
                  if (initials.length > 1) {
                    const newHighScores = this.updateLocalHighScores();

                    const res = await axios.post(
                      'https://wcs0oio6th.execute-api.us-east-1.amazonaws.com/dev/score',
                      {
                        score,
                        initials,
                        level,
                        bestGroup,
                        date: DateTime.local().toISO(),
                        type: gameType,
                      }
                    );

                    this.setState({
                      submitted: true,
                      // Shouldn't be used.
                      highscoresLocal: newHighScores,
                      highscoresGlobal: res.data.top10,
                      globalPlace: res.data.place,
                      globalPlays: res.data.total,
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
  }
}

GameOver.propTypes = {
  bestGroup: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  restartGame: PropTypes.func.isRequired,
  rotation: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default GameOver;
