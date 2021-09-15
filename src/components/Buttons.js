import React from 'react';
import classNames from 'classnames';

export const ButtonPlayOriginal = ({ restartGame, hasIcon }) => {
  return (
    <button
      className={classNames('btn', { 'overlay-btn': hasIcon })}
      onClick={restartGame('original')}
      type="button"
    >
      Play Original
      {hasIcon && <i className="fa fa-clock" style={{ marginLeft: '0.2em' }} />}
    </button>
  );
};

export const ButtonPlayPlayPuzzle = ({ restartGame, hasIcon }) => {
  return (
    <button className="btn" onClick={restartGame('puzzle')} type="button">
      Play Puzzle
      {hasIcon && (
        <i className="fa fa-puzzle-piece" style={{ marginLeft: '0.2em' }} />
      )}
    </button>
  );
};
