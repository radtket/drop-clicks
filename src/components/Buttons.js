import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import FavoriteIcon from '@material-ui/icons/Favorite';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const Buttons = ({ active, handleRotate, handleRandom, movesLeft }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      className={classes.root}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      value={value}
    >
      <BottomNavigationAction
        icon={<RotateLeftIcon />}
        label="Rotate Left"
        onClick={handleRotate(-1)}
      />
      <BottomNavigationAction
        icon={<HelpOutlineIcon />}
        label="Random"
        onClick={handleRandom}
      />
      <BottomNavigationAction
        icon={<RotateRightIcon />}
        label="Rotate Right"
        onClick={handleRotate(1)}
      />
      <BottomNavigationAction icon={<FavoriteIcon />} label={movesLeft} />
    </BottomNavigation>
  );
  return (
    <div className="moves" style={{ opacity: active ? 1 : 0.3 }}>
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
        <div className="moves-holder-wrapper">
          <div className="moves-header">MOVES</div>
          <div className="moves-remaining">{movesLeft}</div>
        </div>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  active: PropTypes.bool.isRequired,
  handleRotate: PropTypes.func.isRequired,
  handleRandom: PropTypes.func.isRequired,
  movesLeft: PropTypes.number.isRequired,
};

export default Buttons;
