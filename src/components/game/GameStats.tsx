import { Switch } from '@material-ui/core';
import React from 'react';
import { BoardState } from '../../logic/board';
import { Player } from './Game';

interface Props {
  boardState: BoardState;
  switchBotDelay: (delay: boolean) => void;
  botDelayOn: boolean;
}

export const GameStats: React.FunctionComponent<Props> = ({ boardState, botDelayOn, switchBotDelay }: Props) => {
  return (
    <div className="flex flex-col p-4 items-center bg-honeydew shadow rounded m-2 w-full max-w-md border">
      <h1 className="text-3xl text-center font-light">Unbeatable TicTacToe</h1>
      <hr className="border-t w-4/5 my-1 border-celadon-blue" />
      <h3 className={`font-extrabold ${boardState.playerTurn === Player ? 'text-green-700' : 'text-red-800'}`}>
        {boardState.playerTurn === Player ? 'Your' : 'Bot'} turn
      </h3>

      <hr className="border-t w-4/5 my-1 border-celadon-blue" />
      <span>
        <Switch
          checked={botDelayOn}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => switchBotDelay(event.target.checked)}
        />
        Bot Delayed
      </span>
    </div>
  );
};
