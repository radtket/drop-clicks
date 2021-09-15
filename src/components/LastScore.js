import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ score }) => {
  if (score > 0) {
    return `+${score.toLocaleString()}`;
  }

  if (score === 0) {
    return '';
  }

  return score;
};

const LastScore = ({ score }) => {
  return (
    <div
      className="last-score"
      style={{
        color: score < 0 ? 'red' : 'white',
      }}
    >
      <Score {...{ score }} />
    </div>
  );
};

LastScore.propTypes = {
  score: PropTypes.number.isRequired,
};

export default LastScore;
