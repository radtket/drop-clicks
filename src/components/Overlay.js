import React from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ children, noAnimation, highScore }) => {
  return (
    <div
      className={highScore ? 'overlay overlay-high-score' : 'overlay'}
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
