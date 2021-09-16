import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BottomNav = ({ active, handleRotate, handleRandom, movesLeft }) => {
  return (
    <div className={classNames('moves', { active })}>
      <button className="icon-holder" onClick={handleRotate(-1)} type="button">
        <i className="fa fa-redo-alt fa-flip-horizontal" />
      </button>
      <button className="icon-holder" onClick={handleRandom} type="button">
        <i className="fa fa-random" />
      </button>
      <button className="icon-holder" onClick={handleRotate(1)} type="button">
        <i className="fa fa-redo-alt" />
      </button>
      <div className="icon-holder moves-holder">
        <dl className="moves-holder-wrapper">
          <dt className="moves-header">MOVES</dt>
          <dd className="moves-remaining">{movesLeft}</dd>
        </dl>
      </div>
    </div>
  );
};

BottomNav.propTypes = {
  active: PropTypes.bool.isRequired,
  handleRotate: PropTypes.func.isRequired,
  handleRandom: PropTypes.func.isRequired,
  movesLeft: PropTypes.number.isRequired,
};

export default BottomNav;
