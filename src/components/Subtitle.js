import React from 'react';
import { ENCOURAGEMENT } from '../utils/constants';

const Subtitle = ({ place, showGlobal, globalPlace, globalPlays }) => {
  const exclamation =
    ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];
  if (showGlobal && globalPlace && globalPlays) {
    // Show place always
    const percentile = globalPlace / globalPlays;
    return (
      <div className="overlay-text" style={{ color: 'white' }}>
        #{globalPlace} of {globalPlays} All-Time.{' '}
        {percentile < 0.5 && exclamation}
      </div>
    );
  }
  if (place > 0) {
    // Show local
    return (
      <div className="overlay-text" style={{ color: 'white' }}>
        #{place} All-Time. {exclamation}
      </div>
    );
  }
  return false;
};

export default Subtitle;
