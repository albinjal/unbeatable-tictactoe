import React from 'react';
import { BoardState } from '../../logic/board';
import { otherPlayer, Players } from '../../logic/outcomes';
import { Player } from './Game';

interface Props {
  boardState: BoardState;
  score: Record<Players, number>;
}

export const GameStats: React.FunctionComponent<Props> = ({ boardState, score }: Props) => {
  return (
    <div className="flex flex-col p-4 items-center bg-white shadow rounded m-2 w-full max-w-md border">
      <h1 className="text-3xl text-center font-light">Unbeatable TicTacToe</h1>
      <h2>
        Bot {score[otherPlayer(Player)]} – {score[Player]} You
      </h2>
      <hr className="border-t w-4/5 my-1 border-celadon-blue" />
      <h3>{boardState.playerTurn === Player ? 'Your' : 'Bot'} turn</h3>

      <h2>Settings</h2>
      <hr className="border-t w-4/5 my-1 border-celadon-blue" />
    </div>
  );
};
