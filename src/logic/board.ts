import { TileState, Players } from './tile-state';

export class BoardState {
  tiles: TileState[];
  playerTurn: Players;
  readonly width: number = 3;
  readonly heigth: number = 3;

  constructor(playerTurn: Players, tiles?: TileState[]) {
    this.playerTurn = playerTurn;
    if (tiles) {
      this.tiles = tiles;
    } else {
      this.tiles = new Array<TileState>(this.calcTotalTiles()).fill(
        TileState.Empty
      );
    }
  }

  calcTotalTiles = () => this.width * this.heigth;

  minMaxOutcome = (): TileState => {
    const won = this.wonGame();
    if (won) {
      return won;
    }
    if (this.okMoves().length === 0) {
      return TileState.Empty;
    }
    let best = this.otherPlayer();
    for (const move of this.okMoves()) {
      const potentialOutcome = this.makeMove(move).minMaxOutcome();
      if (potentialOutcome * this.playerTurn > best * this.playerTurn) {
        best = potentialOutcome;
      }
    }
    return best;
  };

  okMoves = () => {
    let moves: number[] = [];
    this.tiles.forEach((v, i) => {
      if (v === TileState.Empty) {
        moves.push(i);
      }
    });
    return moves;
  };

  makeMove = (tile: number) => {
    let newTiles = [...this.tiles];
    newTiles[tile] = this.playerTurn;
    return new BoardState(this.otherPlayer(), newTiles);
  };

  otherPlayer = () =>
    this.playerTurn === TileState.Circle ? TileState.Cross : TileState.Circle;

  wonGame = (): TileState => {
    const rWin = this.rowWin();
    if (rWin) return rWin;

    const cWin = this.colWin();
    if (cWin) return cWin;

    const d1Win = this.dia1Win();
    if (d1Win) return d1Win;

    return this.dia2Win();
  };

  // Did not want these methods static but did not want to mess with this outside arrow functions
  // https://stackoverflow.com/questions/27661306/can-i-use-es6s-arrow-function-syntax-with-generators-arrow-notation
  private rowWin = (): TileState => {
    const totalTiles = this.calcTotalTiles();
    const lastRowStartTile = totalTiles - this.width;
    for (let y = 0; y <= lastRowStartTile; y += this.width) {
      const first = this.tiles[y];
      if (first === TileState.Empty) continue;
      const lastTile = y + this.width - 1;
      for (let i = 0; i <= lastTile; i++) {
        const tile = y + i;
        if (this.tiles[tile] !== first) break;
        if (tile === lastTile) return first;
      }
    }
    return TileState.Empty;
  };

  private colWin = (): TileState => {
    const totalTiles = this.calcTotalTiles();
    // Iterates over every column
    for (let y = 0; y < this.width; y++) {
      const first = this.tiles[y];
      if (first === TileState.Empty) continue;
      // Iterates over every tile in column y
      const lastTile = totalTiles - this.width + y;
      for (let i = this.width; i <= lastTile; i += this.width) {
        const tile = y + i;
        if (this.tiles[tile] !== first) break;
        if (tile === lastTile) return first;
      }
    }
    return TileState.Empty;
  };

  private dia1Win = () => {
    const first = this.tiles[0];
    const totalTiles = this.calcTotalTiles();
    for (let i = this.width + 1; i < totalTiles; i += this.width + 1) {
      if (this.tiles[i] !== first) return TileState.Empty;
    }
    return first;
  };

  private dia2Win = () => {
    const steps = this.width - 1;
    const first = this.tiles[steps];
    const totalTiles = this.calcTotalTiles();
    for (let i = 2 * steps; i <= totalTiles - this.width; i += steps) {
      if (this.tiles[i] !== first) return TileState.Empty;
    }
    return first;
  };
}
