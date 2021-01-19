import { Outcomes } from '../../logic/outcomes';
import React from 'react';

const tileColors = {
  [Outcomes.Neutral]: 'bg-soft-white',
  [Outcomes.Circle]: 'bg-red-800',
  [Outcomes.Cross]: 'bg-green-700',
};

interface Props {
  state: Outcomes;
  onClick: () => void;
}

const Tile: React.FunctionComponent<Props> = ({ state, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`border-8 focus:outline-none font-bold text-4xl md:text-6xl border-prussian-blue text-white ${tileColors[state]}`}
    >
      {state ? (state === Outcomes.Cross ? 'X' : 'O') : null}
    </button>
  );
};

export default Tile;
