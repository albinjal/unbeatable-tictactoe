import { useCallback, useContext, useEffect, useState } from 'react';
import { BoardState } from '../../logic/board';
import React from 'react';
import Board from './Board';
import { Outcomes, Players, otherPlayer } from '../../logic/outcomes';
import { calculateBestMove } from '../../logic/bot';
import { GameStats } from './GameStats';
import { SnackbarContext } from '../snackbars/SnackbarWrapper';

export const Player = Outcomes.Cross;

const Game: React.FunctionComponent = () => {
  const [startingNext, setStarting] = useState<Players>(Player);
  const [boardState, setBoard] = useState<BoardState>(new BoardState(startingNext));
  const [score, setScore] = useState<Record<Players, number>>({ [Outcomes.Circle]: 0, [Outcomes.Cross]: 0 });
  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    // Check for game over
    if (boardState.done) {
      gameOver();
      return;
    }
    if (boardState.playerTurn === otherPlayer(Player)) {
      // Bots turn
      botTurn();
    }
  }, [boardState]);

  const botTurn = async () => {
    const optimalMove = await calculateBestMove(boardState);
    // Delay for dramatic effect
    setTimeout(() => {
      makeMove(optimalMove);
    }, 500);
  };

  const makeMove = (tile: number) => {
    setBoard(boardState.makeMove(tile));
  };

  const restart = () => {
    setBoard(new BoardState(startingNext));
    setStarting(otherPlayer(startingNext));
  };

  const playerMakeMove = (tile: number) => {
    if (boardState.playerTurn === Player) {
      if (boardState.tiles[tile] === Outcomes.Neutral) makeMove(tile);
    }
  };
  const gameOver = () => {
    if (boardState.winner) {
      const newScore = score;
      ++newScore[otherPlayer(Player)];
      setScore(newScore);
    }
    openSnackbar(`Game Over. ${boardState.winner ? 'Bot Won' : 'Draw'}!`);
    setTimeout(restart, 1000);
  };

  return (
    <div className="flex w-full flex-wrap justify-center items-center flex-grow">
      <Board board={boardState} makeMove={playerMakeMove} />
      <GameStats boardState={boardState} score={score} />
    </div>
  );
};

export default Game;
