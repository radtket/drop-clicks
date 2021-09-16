import React from 'react';
import { ENCOURAGEMENT } from '../utils/constants';

const Subtitle = ({ place, globalPlace, globalPlays }) => {
  const exclamation =
    ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];

  if (globalPlace && globalPlays) {
    return (
      <div className="overlay-text">
        #{globalPlace} of {globalPlays} All-Time.{' '}
        {globalPlace / globalPlays < 0.5 && exclamation}
      </div>
    );
  }
  if (place > 0) {
    // Show local
    return (
      <div className="overlay-text">
        #{place} All-Time. {exclamation}
      </div>
    );
  }
  return false;
};

export default Subtitle;
