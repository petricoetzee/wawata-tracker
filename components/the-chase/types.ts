export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Contestant {
  name: string;
  cashBuilderAmount: number;
  offerTaken: 'low' | 'normal' | 'high';
  offerAmount: number;
  survived: boolean;
  played: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GamePhase =
  | 'intro'
  | 'cash-builder-intro'
  | 'cash-builder'
  | 'cash-builder-result'
  | 'offer'
  | 'head-to-head'
  | 'head-to-head-result'
  | 'final-chase-intro'
  | 'final-chase-team'
  | 'final-chase-team-result'
  | 'final-chase-chaser'
  | 'game-over';

export interface GameState {
  phase: GamePhase;
  currentContestant: number;
  contestants: Contestant[];
  teamBank: number;
  difficulty: Difficulty;
  usedQuestionIds: Set<number>;
}

export const CONTESTANT_NAMES = ['Alex', 'Jordan', 'Sam', 'Riley'];
export const CHASER_NAME = 'The Strategist';
export const CASH_PER_CORRECT = 1000;
export const CASH_BUILDER_SECONDS = 60;
export const FINAL_CHASE_SECONDS = 120;
export const BOARD_SIZE = 7;

export function getChaserAccuracy(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 0.55;
    case 'medium': return 0.72;
    case 'hard': return 0.88;
  }
}
