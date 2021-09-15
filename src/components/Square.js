import React from 'react';
import PropTypes from 'prop-types';

const Square = ({
  dim,
  rotation,
  squareHeight,
  row,
  col,
  color,
  handleClick,
}) => {
  const POSTION = {
    top: 0,
    left: 0,
  };

  const MOD_ROTATION = ((rotation % 4) + 4) % 4;

  switch (MOD_ROTATION) {
    case 0:
      POSTION.top = squareHeight * (dim - row - 1);
      POSTION.left = squareHeight * col;
      break;
    case 1:
      POSTION.top = squareHeight * (dim - col - 1);
      POSTION.left = squareHeight * (dim - row - 1);
      break;
    case 2:
      POSTION.top = squareHeight * row;
      POSTION.left = squareHeight * (dim - col - 1);
      break;
    case 3:
      POSTION.top = squareHeight * col;
      POSTION.left = squareHeight * row;
      break;
    default:
      // Number theory suggests this isn't necessary... silly linter
      POSTION.top = squareHeight * (dim - row - 1);
      POSTION.left = squareHeight * col;
  }

  return (
    <button
      className="translateX"
      onClick={handleClick(col, row)}
      onTransitionEnd={e => {
        return e.stopPropagation();
      }}
      style={{ transform: `translateX(${POSTION.left}px)`, border: 0 }}
      type="button"
    >
      <div
        className="translateY"
        style={{ transform: `translateY(${POSTION.top}px)` }}
      >
        <div
          className={`square color-${color}`}
          style={{ height: squareHeight, width: squareHeight }}
        />
      </div>
    </button>
  );
};

Square.propTypes = {
  dim: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  squareHeight: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Square;
