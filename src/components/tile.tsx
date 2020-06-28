import React, { FunctionComponent } from 'react';
import { TileState } from '../logic/tile-state';
interface TileProps {
  status: TileState;
  onClick: () => void;
}

export const Tile: FunctionComponent<TileProps> = (props: TileProps) => {
  const { status, onClick } = props;
  return (
    <div onClick={onClick} className={`tile status-${status.toString()}`}>
      {mark(status)}
    </div>
  );
};

const mark = (state: TileState): string => {
  switch (state) {
    case TileState.Cross:
      return 'X';
    case TileState.Circle:
      return 'O';
    default:
      return '';
  }
};
