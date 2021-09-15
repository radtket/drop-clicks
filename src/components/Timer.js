import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GAME_SIZE } from '../utils/constants';

const Timer = ({
  active,
  elapsedTime,
  hasBeenPaused,
  setGameOver,
  startTime,
  time,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getPercentLeft = () => {
      const currentTime = new Date().getTime();
      const endTime = startTime + time * 1000;

      if (currentTime > endTime) {
        return 0;
      }

      return (endTime - currentTime) / (time * 1000);
    };

    setWidth(active ? `${GAME_SIZE}px` : `${GAME_SIZE * getPercentLeft()}px`);
  }, [active, startTime, time]);

  return (
    <div className="timer-wrapper" style={{ width }}>
      <div
        className={active ? 'timer timer-animation' : 'timer timer-inactive'}
        onAnimationEnd={setGameOver}
        style={{
          animationDuration: `${time}s`,
          animationDelay: hasBeenPaused ? `-${elapsedTime / 1000}s` : '0s',
        }}
      />
    </div>
  );
};

Timer.propTypes = {
  active: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number,
  hasBeenPaused: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  setGameOver: PropTypes.func.isRequired,
};

export default Timer;