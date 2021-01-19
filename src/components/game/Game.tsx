import { useCallback, useContext, useEffect, useState } from 'react';
import { BoardState } from '../../logic/board';
import React from 'react';
import Board from './Board';
import { Outcomes, Players, otherPlayer } from '../../logic/outcomes';
import { calculateBestMove } from '../../logic/bot';
import { GameStats } from './GameStats';
import { SnackbarContext } from '../snackbars/SnackbarWrapper';

const standardDelay = 700;

export const Player = Outcomes.Cross;

const Game: React.FunctionComponent = () => {
  const [startingNext, setStarting] = useState<Players>(Player);
  const [boardState, setBoard] = useState<BoardState>(new BoardState(startingNext));
  const [delayOn, setDelayOn] = useState(true);
  const { openSnackbar } = useContext(SnackbarContext);

  const restart = useCallback(() => {
    setBoard(new BoardState(startingNext));
    setStarting(otherPlayer(startingNext));
  }, [startingNext]);

  const gameOver = useCallback(() => {
    openSnackbar(`Game Over. ${boardState.winner ? 'Bot Won' : 'Draw'}!`);
    setTimeout(restart, 1000);
  }, [boardState.winner, openSnackbar, restart]);

  const makeMove = useCallback(
    (tile: number) => {
      setBoard(boardState.makeMove(tile));
    },
    [boardState],
  );

  const botTurn = useCallback(async () => {
    const optimalMove = await calculateBestMove(boardState);
    // Delay for dramatic effect
    setTimeout(
      () => {
        makeMove(optimalMove);
      },
      delayOn ? standardDelay : 0,
    );
  }, [boardState, delayOn, makeMove]);

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
  }, [boardState, botTurn, gameOver]);

  const playerMakeMove = (tile: number) => {
    if (boardState.playerTurn === Player) {
      if (boardState.tiles[tile] === Outcomes.Neutral) makeMove(tile);
    }
  };

  const switchBotDelay = (delay: boolean) => {
    setDelayOn(delay);
  };

  return (
    <div className="flex w-full flex-wrap justify-center items-center flex-grow">
      <Board board={boardState} makeMove={playerMakeMove} />
      <GameStats boardState={boardState} switchBotDelay={switchBotDelay} botDelayOn={delayOn} />
    </div>
  );
};

export default Game;
