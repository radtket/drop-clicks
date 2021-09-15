import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

const formatDate = date => {
  switch (date) {
    case '12/25/2018':
      return (
        <span>
          <span style={{ color: 'red' }}>XMAS</span>
          <span style={{ color: '#00c900' }}>18❤️</span>
        </span>
      );
    case DateTime.local().toLocaleString(DateTime.DATE_SHORT):
      return 'Today';
    case DateTime.local()
      .minus({ days: 1 })
      .toLocaleString(DateTime.DATE_SHORT):
      return 'Yesterday';
    default:
      return date;
  }
};

const HighScoreRow = ({ score, i, place }) => {
  const classes =
    place && i === place - 1 ? 'highscore-li new-score' : 'highscore-li';

  const date = DateTime.fromISO(score.date).toLocaleString(DateTime.DATE_SHORT);
  return (
    <li key={i} className={classes}>
      <span className="highscore-initials">
        <span className="highscore-place">{i + 1}.</span> {score.initials}
      </span>
      <span className="highscore-score">{score.score.toLocaleString()}</span>
      <span className="highscore-date">{formatDate(date)}</span>
    </li>
  );
};

HighScoreRow.propTypes = {
  score: PropTypes.shape({
    initials: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  i: PropTypes.number.isRequired,
  place: PropTypes.number.isRequired,
};

export default HighScoreRow;
