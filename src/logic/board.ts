import { Outcomes, Players, otherPlayer } from './outcomes';
export class BoardState {
  tiles: Outcomes[];
  playerTurn: Players;
  done = false;
  winner: Outcomes = Outcomes.Neutral;
  readonly width: number = 3;
  readonly heigth: number = 3;
  private readonly totalTiles = this.width * this.heigth;

  constructor(playerTurn: Players, tiles?: Outcomes[]) {
    this.playerTurn = playerTurn;
    if (tiles) {
      this.tiles = tiles;
      this.checkForGameOver();
    } else {
      this.tiles = new Array<Outcomes>(this.getTotalTiles()).fill(Outcomes.Neutral);
    }
  }

  getTotalTiles = () => this.totalTiles;

  okMoves = () => {
    const moves: number[] = [];
    this.tiles.forEach((v, i) => {
      if (v === Outcomes.Neutral) {
        moves.push(i);
      }
    });
    return moves;
  };

  makeMove = (tile: number) => {
    const newTiles = [...this.tiles];
    newTiles[tile] = this.playerTurn;
    return new BoardState(this.otherPlayer(), newTiles);
  };

  otherPlayer = () => otherPlayer(this.playerTurn);

  private checkForGameOver = () => {
    if ((this.winner = this.wonGame())) {
      this.done = true;
    } else {
      this.done = this.full();
    }
  };

  private full = () => this.okMoves().length === 0;

  private wonGame = (): Outcomes => {
    const rWin = this.rowWin();
    if (rWin) return rWin;

    const cWin = this.colWin();
    if (cWin) return cWin;

    const d1Win = this.dia1Win();
    if (d1Win) return d1Win;

    return this.dia2Win();
  };

  // Did wanted generator fucntions here but also wanted to keep the arrow function syntax
  // https://stackoverflow.com/questions/27661306/can-i-use-es6s-arrow-function-syntax-with-generators-arrow-notation
  private rowWin = (): Outcomes => {
    const totalTiles = this.getTotalTiles();
    const lastRowStartTile = totalTiles - this.width;
    for (let y = 0; y <= lastRowStartTile; y += this.width) {
      const first = this.tiles[y];
      if (first === Outcomes.Neutral) continue;
      const lastTile = y + this.width - 1;
      for (let i = 0; i <= lastTile; i++) {
        const tile = y + i;
        if (this.tiles[tile] !== first) break;
        if (tile === lastTile) return first;
      }
    }
    return Outcomes.Neutral;
  };

  private colWin = (): Outcomes => {
    const totalTiles = this.getTotalTiles();
    // Iterates over every column
    for (let y = 0; y < this.width; y++) {
      const first = this.tiles[y];
      if (first === Outcomes.Neutral) continue;
      // Iterates over every tile in column y
      const lastTile = totalTiles - this.width + y;
      for (let i = this.width; i <= lastTile; i += this.width) {
        const tile = y + i;
        if (this.tiles[tile] !== first) break;
        if (tile === lastTile) return first;
      }
    }
    return Outcomes.Neutral;
  };

  private dia1Win = () => {
    const first = this.tiles[0];
    const totalTiles = this.getTotalTiles();
    for (let i = this.width + 1; i < totalTiles; i += this.width + 1) {
      if (this.tiles[i] !== first) return Outcomes.Neutral;
    }
    return first;
  };

  private dia2Win = () => {
    const steps = this.width - 1;
    const first = this.tiles[steps];
    const totalTiles = this.getTotalTiles();
    for (let i = 2 * steps; i <= totalTiles - this.width; i += steps) {
      if (this.tiles[i] !== first) return Outcomes.Neutral;
    }
    return first;
  };
}
