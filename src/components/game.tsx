import React, { FunctionComponent, useState } from 'react';
import { BoardState } from '../logic/board';
import { TileState } from '../logic/tile-state';
import { Tile } from './tile';
import { bestMove } from '../logic/bot';

export const Game: FunctionComponent = () => {
  const botDelay = 300;
  let botStarted = false;
  const bot = TileState.Cross;
  const [boardState, setBoard] = useState(new BoardState(TileState.Circle));
  const gameOverCheck = (board: BoardState) => {
    const won = board.wonGame();
    if (won) {
      setTimeout(() => {
        alert(won === TileState.Circle ? 'You Won!' : 'Computer Won!');
        restart();
      });
      return false;
    }
    if (board.okMoves().length === 0) {
      setTimeout(() => {
        alert('Draw!');
        restart();
      });
      return false;
    }
    return true;
  };

  const restart = () => {
    let newBoard = new BoardState(botStarted ? bot * -1 : bot);
    if (!botStarted) {
      setTimeout(
        () => setBoard(newBoard.makeMove(bestMove(newBoard))),
        botDelay
      );
    }
    setBoard(newBoard);
  };
  return (
    <div className='wrapper'>
      <h1>Unbeatable Tic Tac Toe</h1>
      <div className='board'>
        {boardState.tiles.map((tile, i) => (
          <Tile
            status={tile}
            onClick={() => {
              if (
                boardState.tiles[i] === TileState.Empty &&
                boardState.playerTurn !== bot
              ) {
                const playerMove = boardState.makeMove(i);
                setBoard(playerMove);
                if (gameOverCheck(playerMove)) {
                  const botMove = playerMove.makeMove(bestMove(playerMove));
                  setTimeout(() => {
                    setBoard(botMove);
                    gameOverCheck(botMove);
                  }, botDelay);
                }
              }
            }}
            key={i}
          ></Tile>
        ))}
      </div>
      <span className='turn'>
        <h3>
          {boardState.playerTurn === TileState.Circle ? 'Your ' : 'Computers '}
          Turn
        </h3>
      </span>
    </div>
  );
};
