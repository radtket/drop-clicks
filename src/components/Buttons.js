import React from 'react';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '../utils/helpers';
import { GAME_TYPE_ORIGINAL, GAME_TYPE_PUZZLE } from '../utils/constants';

const Icon = ({ gameType }) => {
  return (
    <i
      className={classNames('fa', {
        'fa-clock': gameType === GAME_TYPE_ORIGINAL,
        'fa-puzzle-piece': gameType === GAME_TYPE_PUZZLE,
      })}
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
