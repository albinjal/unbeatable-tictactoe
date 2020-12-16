import { Slider } from '@material-ui/core';
import React from 'react';
import { BoardState } from '../../logic/board';
import { otherPlayer } from '../../logic/outcomes';
import { GameModes, Player } from './Game';

const delayScale = 50;
interface Props {
  boardState: BoardState;
  changeDelay: (delay: number) => void;
  changeMode: (mode: GameModes) => void;
  botDelay: number;
  mode: GameModes;
}

export const GameStats: React.FunctionComponent<Props> = ({
  boardState,
  botDelay,
  mode,
  changeDelay,
  changeMode,
}: Props) => {
  console.log(botDelay);
  return (
    <div className="flex flex-col p-4 items-center bg-white shadow rounded m-2 w-full max-w-md border">
      <h1 className="text-3xl text-center font-light">Unbeatable TicTacToe</h1>
      <hr className="border-t w-4/5 my-1 border-celadon-blue" />
      <h3>{boardState.playerTurn === Player ? 'Your' : 'Bot'} turn</h3>

      <h2>Settings</h2>
      <hr className="border-t w-4/5 my-1 border-celadon-blue" />
      <Slider value={botDelay} onChange={(event, newValue) => changeDelay(newValue as number)}></Slider>
    </div>
  );
};
