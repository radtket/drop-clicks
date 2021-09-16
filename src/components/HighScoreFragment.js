import React from 'react';
import PropTypes from 'prop-types';

const HighScoreFragment = ({
  handleChange,
  handleSubmit,
  resetGame,
  initials,
  isHighScore,
}) => {
  return (
    <>
      <div
        className="overlay-text"
        style={{
          color: 'inherit',
        }}
      >
        {isHighScore
          ? "You've got a high score! Please enter your initials."
          : 'Submit your score to see you how you did globally!'}
      </div>
      <div className="highscore-input">
        <input
          maxLength="3"
          onChange={handleChange}
          placeholder="---"
          size="3"
          type="text"
          value={initials}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <buttom className="btn" onClick={handleSubmit} type="button">
          Submit
        </buttom>
        {!isHighScore && (
          <buttom className="btn" onClick={resetGame} type="button">
            Play Again
          </buttom>
        )}
      </div>
    </>
  );
};

HighScoreFragment.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initials: PropTypes.string.isRequired,
  isHighScore: PropTypes.bool.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default HighScoreFragment;
