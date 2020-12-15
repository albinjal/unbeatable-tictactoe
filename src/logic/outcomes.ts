export enum Outcomes {
  Cross = 1,
  Circle = -1,
  Neutral = 0,
}

export type Players = Outcomes.Circle | Outcomes.Cross;

export const otherPlayer = (state: Outcomes) => (state === Outcomes.Circle ? Outcomes.Cross : Outcomes.Circle);
