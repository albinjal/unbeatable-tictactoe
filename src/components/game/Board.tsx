import React from 'react';
import { BoardState } from '../../logic/board';
import Tile from './Tile';

interface Props {
  board: BoardState;
  makeMove: (tile: number) => void;
}
const Board: React.FunctionComponent<Props> = ({ board, makeMove }: Props) => (
  <div className="grid grid-rows-3 grid-cols-3 bg- w-bvw0 h-bvw0 md:w-bvw1 md:h-bvw1 border-4 border-prussian-blue bg-soft-white">
    {board.tiles.map((value, i) => (
      <Tile state={value} key={i} onClick={() => makeMove(i)} />
    ))}
  </div>
);

export default Board;
