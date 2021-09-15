import React, { Component } from 'react';
import './App.scss';

// Components
import Overlays from './components/Overlays';
import Square from './components/Square';
import Buttons from './components/Buttons';
import LastScore from './components/LastScore';
import Timer from './components/Timer';

import { GAME_SIZE } from './utils/constants';
import { getElapsedTime } from './utils/helpers';

import { saveState } from './utils/local-storage';
import {
  getPieceBonus,
  getSquareCollection,
  isLevelOver,
  randomizeBoard,
  removeSquaresAndCondense,
  rotateBoard,
  rotateBoardCounter,
} from './utils/logic-board';
import {
  getNextLevelState,
  getTimeBonus,
  newGameState,
} from './utils/logic-levels';

class App extends Component {
  constructor(props) {
    super(props);

    const boardState = JSON.parse(localStorage.getItem('board-state'));

    if (boardState) {
      this.state = boardState;
    } else {
      this.state = {
        // Show initial play screen
        initialized: false,
        gameType: 'original',
        ...newGameState('original'),
        // So timer isn't active
        gameOver: true,
        paused: false,
      };
    }
  }

  UNSAFE_componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );
  }

  handleVisibilityChange = () => {
    const { gameOver, paused, levelOver } = this.state;
    if (document.hidden && !gameOver && paused) {
      if (levelOver) {
        const newState = getNextLevelState(this.state);
        this.setState({ ...newState, elapsedTime: 0, paused: true }, () => {
          return saveState(this.state);
        });
      } else {
        const elapsedTime = getElapsedTime(this.state);
        this.setState({ paused: true, elapsedTime }, () => {
          return saveState(this.state);
        });
      }
    }
  };

  handleResume = () => {
    const { elapsedTime } = this.state;
    const startTime = new Date().getTime() - elapsedTime;
    this.setState({ hasBeenPaused: true, paused: false, startTime });
    localStorage.removeItem('board-state');
  };

  setGameOver = () => {
    this.setState({ gameOver: true });
  };

  handleClick = (row, col) => {
    return () => {
      const {
        board: oldBoard,
        clicks: oldClicks,
        score,
        level,
        bestGroup,
        movesLeft,
      } = this.state;

      const collection = getSquareCollection(oldBoard, row, col);
      const clicks = oldClicks + 1;

      if (collection.length === 1) {
        // Don't do anything? Deduct score?
        const lastScore = -100 * (level + 1);
        this.setState({
          score: score + lastScore,
          lastScore,
          clicks,
        });
        return;
      }

      const board = removeSquaresAndCondense(oldBoard, collection);

      const lastScore = collection.length * collection.length * (level + 5);

      const levelOver = isLevelOver(board, movesLeft);

      const {
        pieceBonus = 0,
        timeBonus = 0,
        levelBonus = 0,
        gameOver = false,
      } = this.handleLevelOver(levelOver, board);

      this.setState({
        bestGroup: Math.max(bestGroup, collection.length),
        board,
        clicks,
        falling: false,
        gameOver,
        lastScore,
        levelBonus,
        levelOver,
        pieceBonus,
        rotating: false,
        score: score + lastScore,
        timeBonus,
      });
    };
  };

  handleRotate = dir => {
    return () => {
      const { rotating, movesLeft } = this.state;
      // set state rotating
      if (!rotating && this.canUseMove()) {
        this.setState({
          falling: false,
          movesLeft: movesLeft - 1,
          rotating: true,
          rotationDirection: dir,
        });
      }
    };
  };

  handleRandom = () => {
    const { state } = this;
    const { movesLeft } = state;

    if (this.canUseMove()) {
      const board = randomizeBoard(state.board);

      const levelOver = isLevelOver(board, movesLeft - 1);
      const levelOverState = this.handleLevelOver(levelOver, board);
      this.setState({
        board,
        movesLeft: movesLeft - 1,
        levelOver,
        ...levelOverState,
      });
    }
  };

  handleRestart = gameType => {
    return () => {
      this.setState({
        ...newGameState(gameType),
        gameType,
        initialized: true,
        paused: false,
      });
      localStorage.removeItem('board-state');
    };
  };

  resetEverything = () => {
    this.setState({ initialized: false });
  };

  goToNextLevel = () => {
    const newState = getNextLevelState(this.state);
    this.setState(newState);
  };

  handleTransitionEnd = () => {
    const { state } = this;

    // there may be more transitions some day
    if (state.rotating) {
      const board =
        state.rotationDirection === 1
          ? rotateBoard(state.board)
          : rotateBoardCounter(state.board);
      const rotation = state.rotation + state.rotationDirection;
      this.setState({ rotating: false, rotation, falling: true, board });

      if (isLevelOver(board, state.movesLeft)) {
        const levelOverState = this.handleLevelOver(true, board);
        this.setState({ levelOver: true, ...levelOverState });
      }
    }
  };

  handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowLeft':
        this.handleRotate(-1)();
        e.preventDefault();
        break;
      case 'ArrowUp':
        this.handleRandom();
        e.preventDefault();
        break;
      case 'ArrowRight':
        this.handleRotate(1)();
        e.preventDefault();
        break;
      default:
    }
  };

  // Meaning, there are no more clicks remaining in the board
  handleLevelOver = (levelOver, board) => {
    if (!levelOver) {
      return {};
    }

    const { gameType, level, startTime } = this.state;
    const pieceBonus = getPieceBonus(board);

    if (gameType === 'original') {
      // Return bonuses
      return {
        pieceBonus,
        timeBonus: getTimeBonus(level, startTime, gameType),
      };
    }

    // Puzzle
    return {
      gameOver: board.length > 0,
      levelBonus: (level + 1) * 1000,
      pieceBonus,
    };
  };

  canUseMove() {
    const { movesLeft, gameOver, levelOver } = this.state;
    return movesLeft > 0 && !gameOver && !levelOver;
  }

  render() {
    const {
      dim,
      board,
      rotation,
      rotating,
      rotationDirection,
      falling,
      initialized,
      levelOver,
      gameOver,
      paused,
      level,
      clicks,
      score,
      lastScore,
      gameType,
      elapsedTime,
      hasBeenPaused,
      startTime,
      time,
      movesLeft,
    } = this.state;

    // Rounding up seems to be a good way of handling weird subpixel issues.
    const squareHeight = Math.ceil(GAME_SIZE / dim);

    const effectiveRotation = rotating
      ? rotation + rotationDirection
      : rotation;

    const gameStyle = {
      height: `${GAME_SIZE}px`,
      width: `${GAME_SIZE}px`,
      transform: `rotate(${effectiveRotation * 90}deg)`,
    };

    let classes = effectiveRotation % 2 ? 'sideways' : 'upright';

    if (rotating) {
      classes += ' rotating';
    }
    if (falling) {
      classes += ' falling';
    }

    const inactive = !initialized || levelOver || gameOver || paused;

    return (
      <div id="wrapper">
        <div className=" header clearfix">
          <h1>DropClicks</h1>
          <div className="header-container">
            <div className="score-container">
              <div className="score">
                <div className="score-header">LEVEL</div>
                <div>{level + 1}</div>
              </div>
            </div>
            <div className="score-container">
              <div className="score">
                <div className="score-header">SCORE</div>
                <div>{score.toLocaleString()}</div>
              </div>

              <LastScore key={clicks + level} score={lastScore} />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {inactive && (
            <Overlays
              goToNextLevel={this.goToNextLevel}
              resetGame={this.resetEverything}
              restartGame={this.handleRestart}
              resumeGame={this.handleResume}
              rotation={effectiveRotation}
              {...this.state}
              paused={paused}
            />
          )}
          <div
            className={classes}
            id="game"
            onTransitionEnd={this.handleTransitionEnd}
            style={gameStyle}
          >
            {board
              .reduce((all, pile, col) => {
                return all.concat(
                  pile.map((square, row) => {
                    return (
                      <Square
                        key={square.id}
                        col={col}
                        color={square.val}
                        dim={dim}
                        handleClick={this.handleClick}
                        rotation={rotation}
                        row={row}
                        squareHeight={squareHeight}
                      />
                    );
                  })
                );
              }, [])
              .sort((a, b) => {
                // Need to keep the order of elements in order on the page for transitions to work
                return a.key - b.key;
              })}
          </div>
        </div>
        {gameType === 'original' && (
          <Timer
            active={!inactive}
            elapsedTime={elapsedTime}
            hasBeenPaused={hasBeenPaused}
            setGameOver={this.setGameOver}
            startTime={startTime}
            time={time}
          />
        )}
        <Buttons
          active={!inactive}
          handleRandom={this.handleRandom}
          handleRotate={this.handleRotate}
          movesLeft={movesLeft}
        />
      </div>
    );
  }
}

export default App;
