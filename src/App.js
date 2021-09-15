import React, { Component } from 'react';
import classNames from 'classnames';
import './App.scss';

// Components
import Overlays from './components/Overlays';
import Square from './components/Square';
import BottomNav from './components/BottomNav';
import LastScore from './components/LastScore';
import Timer from './components/Timer';

import { GAME_SIZE } from './utils/constants';
import { getElapsedTime } from './utils/helpers';
import { getInitalBoardState, saveState } from './utils/local-storage';
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
  isGameOrigional,
  newGameState,
} from './utils/logic-levels';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = getInitalBoardState();
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
    const { movesLeft, board } = this.state;

    if (this.canUseMove()) {
      const BOARD = randomizeBoard(board);

      const levelOver = isLevelOver(BOARD, movesLeft - 1);
      const levelOverState = this.handleLevelOver(levelOver, BOARD);
      this.setState({
        board: BOARD,
        movesLeft: movesLeft - 1,
        levelOver,
        ...levelOverState,
      });
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

    if (isGameOrigional(gameType)) {
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

  canUseMove = () => {
    const { movesLeft, gameOver, levelOver } = this.state;
    return movesLeft > 0 && !gameOver && !levelOver;
  };

  render() {
    const {
      board,
      clicks,
      dim,
      elapsedTime,
      falling,
      gameOver,
      gameType,
      hasBeenPaused,
      initialized,
      lastScore,
      level,
      levelOver,
      movesLeft,
      paused,
      rotating,
      rotation,
      rotationDirection,
      score,
      startTime,
      time,
    } = this.state;

    const effectiveRotation = rotating
      ? rotation + rotationDirection
      : rotation;

    const inactive = !initialized || levelOver || gameOver || paused;
    const isSideways = effectiveRotation % 2;

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
                <div>{score}</div>
              </div>

              <LastScore key={clicks + level} score={lastScore} />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {inactive && (
            <Overlays
              goToNextLevel={() => {
                const newState = getNextLevelState(this.state);
                this.setState(newState);
              }}
              resetGame={() => {
                this.setState({ initialized: false });
              }}
              restartGame={newGameType => {
                return () => {
                  this.setState({
                    ...newGameState(newGameType),
                    gameType: newGameType,
                    initialized: true,
                    paused: false,
                  });
                  localStorage.removeItem('board-state');
                };
              }}
              resumeGame={() => {
                this.setState({
                  hasBeenPaused: true,
                  paused: false,
                  startTime: new Date().getTime() - elapsedTime,
                });
                localStorage.removeItem('board-state');
              }}
              rotation={effectiveRotation}
              {...this.state}
              paused={paused}
            />
          )}
          <div
            className={classNames({
              rotating,
              falling,
              sideways: isSideways,
              upright: !isSideways,
            })}
            id="game"
            onTransitionEnd={() => {
              // there may be more transitions some day
              if (rotating) {
                const BOARD =
                  rotationDirection === 1
                    ? rotateBoard(board)
                    : rotateBoardCounter(board);

                this.setState({
                  rotating: false,
                  rotation: rotation + rotationDirection,
                  falling: true,
                  board: BOARD,
                });

                if (isLevelOver(BOARD, movesLeft)) {
                  const levelOverState = this.handleLevelOver(true, BOARD);
                  this.setState({ levelOver: true, ...levelOverState });
                }
              }
            }}
            style={{
              height: `${GAME_SIZE}px`,
              width: `${GAME_SIZE}px`,
              transform: `rotate(${effectiveRotation * 90}deg)`,
            }}
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
                        // Rounding up seems to be a good way of handling weird subpixel issues.
                        squareHeight={Math.ceil(GAME_SIZE / dim)}
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
        {isGameOrigional(gameType) && (
          <Timer
            active={!inactive}
            elapsedTime={elapsedTime}
            hasBeenPaused={hasBeenPaused}
            setGameOver={() => {
              this.setState({ gameOver: true });
            }}
            startTime={startTime}
            time={time}
          />
        )}
        <BottomNav
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
