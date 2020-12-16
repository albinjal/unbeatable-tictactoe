import { useContext, useEffect, useState } from 'react';
import { BoardState } from '../../logic/board';
import React from 'react';
import Board from './Board';
import { Outcomes, Players, otherPlayer } from '../../logic/outcomes';
import { calculateBestMove } from '../../logic/bot';
import { GameStats } from './GameStats';
import { SnackbarContext } from '../snackbars/SnackbarWrapper';

export enum GameModes {
  PvP,
  PvB,
  BvB,
}

export const Player = Outcomes.Cross;

const Game: React.FunctionComponent = () => {
  const [startingNext, setStarting] = useState<Players>(Player);
  const [boardState, setBoard] = useState<BoardState>(new BoardState(startingNext));
  const [mode, setMode] = useState(GameModes.PvB);
  const [delay, setDelay] = useState(700);
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
    }, delay * 50);
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
    openSnackbar(`Game Over. ${boardState.winner ? 'Bot Won' : 'Draw'}!`);
    setTimeout(restart, 1000);
  };

  const changeBotDelay = (ms: number) => {
    setDelay(ms);
  };

  const changeMode = (mode: GameModes) => {
    setMode(mode);
  };

  return (
    <div className="flex w-full flex-wrap justify-center items-center flex-grow">
      <Board board={boardState} makeMove={playerMakeMove} />
      <GameStats
        boardState={boardState}
        changeMode={changeMode}
        changeDelay={changeBotDelay}
        botDelay={delay}
        mode={mode}
      />
    </div>
  );
};

export default Game;
