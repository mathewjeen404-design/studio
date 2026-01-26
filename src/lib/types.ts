export type CharState = 'pending' | 'correct' | 'incorrect';

export interface CharLog {
  char: string;
  time: number; // time taken to type this char in ms
  state: 'correct' | 'incorrect' | 'corrected';
}

export interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  time: number;
  charLogs: CharLog[];
  timestamp: number;
  consistency: number;
  mode?: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface KeyStat {
  char: string;
  errors: number;
  totalTime: number;
  count: number;
  avgTime: number;
  errorRate: number;
}

export type FingerName = 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
export type HandName = 'left' | 'right';

export interface FingerStat {
  errors: number;
  count: number;
  totalTime: number;
  avgTime: number;
  errorRate: number;
  wpm: number;
}

export interface UserStats {
  sessions: TestResult[];
  charStats: { [char: string]: KeyStat };
  fingerStats: { [key in FingerName]: FingerStat };
  handStats: { [key in HandName]: FingerStat };
  overallWpm: number;
  overallAccuracy: number;
  totalTests: number;
  totalTimeTyping: number; // in seconds
  unlockedLevel: number;
  // Gamification
  xp: number;
  level: number;
  consistency: number; // 0-100 score
  currentStreak: number;
  longestStreak: number;
  lastSessionTimestamp: number | null;
  certifications: {
    wpm40: boolean;
    wpm60: boolean;
    wpm80: boolean;
    accuracyPro: boolean;
    codeSpecialist: boolean;
  };
  fatigueIndex: number;
  onboarding: {
    goal: 'speed' | 'accuracy' | 'balanced';
    level: 'beginner' | 'intermediate' | 'advanced';
    complete: boolean;
  };
}
