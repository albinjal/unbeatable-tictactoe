export enum TileState {
  Cross = 1,
  Circle = -1,
  Empty = 0,
}

export type Players = TileState.Circle | TileState.Cross;
