import { BoardState } from './board';
import { Outcomes } from './outcomes';

export const calculateBestMove = async (board: BoardState): Promise<number> => {
  console.time('BestMove');
  const movesWithOutcomes = board
    .okMoves()
    .map((move) => [board.playerTurn * minMaxOutcome(board.makeMove(move)), move]);

  let currentBest = -Infinity;
  let bestMoves: number[] = [];
  for (const move of movesWithOutcomes) {
    const outcome = move[0];
    if (outcome > currentBest) {
      bestMoves = [move[1]];
      currentBest = outcome;
      continue;
    }
    if (outcome === currentBest) {
      bestMoves.push(move[1]);
      continue;
    }
  }
  console.log(movesWithOutcomes);
  const randomIndex = Math.floor(Math.random() * bestMoves.length);
  console.timeEnd('BestMove');
  return bestMoves[randomIndex];
};
// const minMaxOutcome = (board: BoardState): Outcomes =>
//   board.done
//     ? board.winner
//     : Math.max(...board.okMoves().map((move) => board.playerTurn * minMaxOutcome(board.makeMove(move))));

const minMaxOutcome = (board: BoardState): Outcomes => {
  if (board.done) {
    return board.winner;
  }
  let best = board.otherPlayer();
  for (const move of board.okMoves()) {
    const potentialOutcome = minMaxOutcome(board.makeMove(move));
    if (potentialOutcome * board.playerTurn > best * board.playerTurn) {
      best = potentialOutcome;
    }
  }
  return best;
};
