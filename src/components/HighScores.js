import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getHighScores } from '../utils/local-storage';
import Subtitle from './Subtitle';
import HighScoreRow from './HighScoreRow';

class HighScores extends Component {
  constructor(props) {
    super(props);
    // This should be a prop
    const { gameType } = props;

    // get local scores
    const localScores = getHighScores();

    // Determine which to show first
    let showGlobal = true;
    if (this.props.currentScore && this.props.globalPlace > 10) {
      // Show if it's a local high score, but not global
      if (this.getPlace(localScores[gameType])) {
        showGlobal = false;
      }
    }
    this.state = {
      gameType,
      loading: true,
      localScores,
      showGlobal,
    };
  }

  componentDidMount = async () => {
    const res = await axios.get(
      'https://wcs0oio6th.execute-api.us-east-1.amazonaws.com/dev/score'
    );

    this.setState({ loading: false, globalScores: res.data.scores });
  };

  getPlace(scores) {
    const placeIndex = scores.findIndex(score => {
      return (
        score.score === this.props.currentScore &&
        score.initials === this.props.currentInitials
      );
    });

    if (placeIndex !== -1) {
      return placeIndex + 1;
    }
    // No such thing as zero place, right?
    return 0;
  }

  getCurrentScores() {
    const { gameType, showGlobal, globalScores, localScores } = this.state;
    return showGlobal ? globalScores[gameType] : localScores[gameType];
  }

  toggle = () => {
    this.setState({ showGlobal: !this.state.showGlobal });
  };

  render() {
    if (this.state.loading) {
      return 'Retrieving Scores...';
    }
    const { showGlobal } = this.state;
    const { globalPlace, globalPlays } = this.props;
    const currentScores = this.getCurrentScores();
    const place = this.getPlace(currentScores);
    return (
      <>
        <h2>
          <span className="highscore-toggle" onClick={this.toggle}>
            <span className="highscore-toggle-arrow">⇣</span>
            {showGlobal ? 'Global' : 'Your'}
          </span>{' '}
          High Scores
        </h2>

        <Subtitle {...{ showGlobal, place, globalPlace, globalPlays }} />

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
          <button
            className="btn"
            onClick={this.props.restartGame('original')}
            type="button"
          >
            Play Original
          </button>
          <button
            className="btn"
            onClick={this.props.restartGame('puzzle')}
            type="button"
          >
            Play Puzzle
          </button>
        </div>
      </>
    );
  }
}

HighScores.propTypes = {
  currentScore: PropTypes.number,
  currentInitials: PropTypes.string,
  gameType: PropTypes.string.isRequired,
  globalPlace: PropTypes.number,
  globalPlays: PropTypes.number,
  restartGame: PropTypes.func.isRequired,
  scores: PropTypes.array.isRequired,
};

export default HighScores;
