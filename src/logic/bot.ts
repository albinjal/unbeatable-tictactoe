import { BoardState } from './board';

export const bestMove = (board: BoardState): number => {
  console.time('BestMove');
  const okMoves = board.okMoves();
  let best = board.otherPlayer();
  let bestMove = okMoves[0];
  okMoves.forEach((move) => {
    const outcome = board.makeMove(move).minMaxOutcome();
    if (outcome * board.playerTurn > best * board.playerTurn) {
      best = outcome;
      bestMove = move;
    }
  });
  console.log('worstcase: ', best);
  console.timeEnd('BestMove');
  return bestMove;
};
