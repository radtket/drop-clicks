import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Date = ({ date }) => {
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

const HighScoreRow = ({
  date,
  highscorePlace,
  initials,
  isNewScore,
  score,
}) => {
  return (
    <li
      className={classNames('highscore-li', {
        'new-score': isNewScore,
      })}
    >
      <span className="highscore-initials">
        <span className="highscore-place">{highscorePlace}.</span> {initials}
      </span>
      <span className="highscore-score">{score}</span>
      <span className="highscore-date">
        <Date
          date={DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT)}
        />
      </span>
    </li>
  );
};

HighScoreRow.propTypes = {
  initials: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default HighScoreRow;
