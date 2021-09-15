import React from 'react';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '../utils/helpers';

const Icon = ({ gameType }) => {
  return (
    <i
      className={classNames('fa', {
        'fa-clock': gameType === 'original',
        'fa-puzzle-piece': gameType === 'puzzle',
      })}
      style={{ marginLeft: '0.2em' }}
    />
  );
};

export const ButtonPlayGameType = ({ restartGame, hasIcon, gameType }) => {
  return (
    <button
      className={classNames('btn', { 'overlay-btn': hasIcon })}
      onClick={restartGame(gameType)}
      type="button"
    >
      Play {capitalizeFirstLetter(gameType)}
      {hasIcon && <Icon {...{ gameType }} />}
    </button>
  );
};

export const ButtonHighScore = ({ setState, gameType }) => {
  return (
    <button
      className="btn overlay-btn"
      onClick={() => {
        setState({
          showHighScore: true,
          gameType,
        });
      }}
      type="button"
    >
      High Scores
      <Icon {...{ gameType }} />
    </button>
  );
};
