import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Overlay = ({ children, noAnimation, highScore }) => {
  return (
    <div
      className={classNames('overlay', {
        'overlay-high-score': highScore,
      })}
      style={noAnimation ? { animation: 'none' } : {}}
    >
      {children}
    </div>
  );
};

Overlay.propTypes = {
  noAnimation: PropTypes.bool,
  highScore: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Overlay;
