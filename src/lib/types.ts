export type CharState = 'pending' | 'correct' | 'incorrect';

export interface TestResult {
  wpm: number;
  accuracy: number;
  errors: number;
  time: number;
}
