import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Score = ({ score }) => {
  if (score > 0) {
    return `+${score}`;
  }

  if (score === 0) {
    return '';
  }

  return score;
};

const LastScore = ({ score }) => {
  return (
    <div className={classNames('last-score', { red: score < 0 })}>
      <Score {...{ score }} />
    </div>
  );
};

LastScore.propTypes = {
  score: PropTypes.number.isRequired,
};

export default LastScore;
