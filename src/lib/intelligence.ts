import type { Difficulty, UserStats, KeyStat, TestResult, FingerName, HandName, FingerStat } from './types';
import { words } from './words';
import { KEY_TO_FINGER_MAP } from './key-map';

const PUNCTUATION = ['.', ',', '?', '!', ';', ':'];
const SYMBOLS = ['(', ')', '[', ']', '{', '}', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '='];
const RARE_WORDS = ['ephemeral', 'ubiquitous', 'gregarious', 'idiosyncrasy', 'juxtaposition', 'mellifluous', 'pulchritudinous', 'sesquipedalian'];
export const FINGERS: FingerName[] = ['left-pinky', 'left-ring', 'left-middle', 'left-index', 'thumb', 'right-index', 'right-middle', 'right-ring', 'right-pinky'];
export const HANDS: HandName[] = ['left', 'right'];

export const DEFAULT_STATS: Omit<UserStats, 'unlockedLevel'> = {
  sessions: [],
  charStats: {},
  fingerStats: FINGERS.reduce((acc, finger) => ({ ...acc, [finger]: { errors: 0, count: 0, totalTime: 0, avgTime: 0, errorRate: 0, wpm: 0 } }), {} as Record<FingerName, FingerStat>),
  handStats: HANDS.reduce((acc, hand) => ({ ...acc, [hand]: { errors: 0, count: 0, totalTime: 0, avgTime: 0, errorRate: 0, wpm: 0 } }), {} as Record<HandName, FingerStat>),
  overallWpm: 0,
  overallAccuracy: 100,
  totalTests: 0,
  totalTimeTyping: 0,
};


export function getDifficulty(wpm: number, accuracy: number): Difficulty {
  if (accuracy < 85) return 'easy';
  if (wpm > 45 && accuracy > 90) return 'hard';
  return 'medium';
}

function getWeakCharacters(charStats: { [char: string]: KeyStat }, count: number = 5): string[] {
    const chars = Object.values(charStats);
    if (chars.length === 0) return [];
    
    const sorted = chars.sort((a, b) => {
        // Prioritize error rate, then slow speed
        if (a.errorRate !== b.errorRate) {
            return b.errorRate - a.errorRate;
        }
        return b.avgTime - a.avgTime;
    });

    // Spaced repetition: focus on characters that haven't been practiced recently
    // This is simplified. A real implementation would track last practiced time.
    // For now, we add some randomness to the top weak characters.
    const topWeak = sorted.slice(0, count * 2);
    return topWeak.sort(() => Math.random() - 0.5).slice(0, count).map(c => c.char);
}

export function generatePracticeText(difficulty: Difficulty, userStats: UserStats): string {
    const wordCount = 30;
    let generatedWords: string[] = [];

    const weakChars = getWeakCharacters(userStats.charStats);

    // 50% of words should contain a weak character
    const weakWordCount = Math.floor(wordCount * 0.5);
    if (weakChars.length > 0) {
        const weakWords = words.filter(word => weakChars.some(char => word.includes(char)));
        for (let i = 0; i < weakWordCount; i++) {
            if (weakWords.length > 0) {
                generatedWords.push(weakWords[Math.floor(Math.random() * weakWords.length)]);
            } else {
                generatedWords.push(words[Math.floor(Math.random() * words.length)]);
            }
        }
    }

    // Fill the rest with random words
    for (let i = generatedWords.length; i < wordCount; i++) {
        generatedWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    
    generatedWords.sort(() => Math.random() - 0.5); // Shuffle words

    let text = generatedWords.join(' ');

    if (difficulty === 'medium' || difficulty === 'hard') {
        // Add capitalization
        text = text.split('. ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ');
        text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    if (difficulty === 'hard') {
        // Add more punctuation
        for (let i = 0; i < 5; i++) {
            const wordIndex = Math.floor(Math.random() * (generatedWords.length -1));
            const punctuation = PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
            generatedWords[wordIndex] += punctuation;
        }
        
        // Add rare words and symbols
        const rareWordIndex = Math.floor(Math.random() * (generatedWords.length - 1));
        generatedWords.splice(rareWordIndex, 1, RARE_WORDS[Math.floor(Math.random() * RARE_WORDS.length)]);

        const symbolIndex = Math.floor(Math.random() * (generatedWords.length - 1));
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        generatedWords.splice(symbolIndex, 0, symbol);
        
        text = generatedWords.join(' ');
    }
    
    // Adjust length based on difficulty
    const sentenceTarget = difficulty === 'easy' ? 2 : (difficulty === 'medium' ? 3 : 4);
    text = text.split('. ').slice(0, sentenceTarget).join('. ') || text;
    
    return text.slice(0, 300); // Limit text length
}

export function analyzeSession(result: TestResult, oldStats: UserStats): UserStats {
    const newStats: UserStats = JSON.parse(JSON.stringify(oldStats)); // Deep copy

    newStats.sessions.push(result);
    if(newStats.sessions.length > 50) { // Keep last 50 sessions
        newStats.sessions.shift();
    }

    newStats.totalTests += 1;
    newStats.totalTimeTyping += result.time;

    for (const log of result.charLogs) {
        const char = log.char.toLowerCase();
        if (!char) continue;

        if (!newStats.charStats[char]) {
            newStats.charStats[char] = { char: char, errors: 0, totalTime: 0, count: 0, avgTime: 0, errorRate: 0 };
        }
        const stats = newStats.charStats[char];
        stats.count++;
        stats.totalTime += log.time;
        stats.avgTime = stats.totalTime / stats.count;
        if (log.state === 'incorrect' || log.state === 'corrected') {
            stats.errors++;
        }
        stats.errorRate = stats.errors / stats.count;

        const mapping = KEY_TO_FINGER_MAP[char];
        if (mapping) {
            const fingerStat = newStats.fingerStats[mapping.finger];
            fingerStat.count++;
            fingerStat.totalTime += log.time;
            if(log.state === 'incorrect' || log.state === 'corrected') {
                fingerStat.errors++;
            }
            fingerStat.errorRate = fingerStat.errors / fingerStat.count;
            fingerStat.avgTime = fingerStat.totalTime / fingerStat.count;
            fingerStat.wpm = fingerStat.avgTime > 0 ? (60 * 1000) / (fingerStat.avgTime * 5) : 0;

            const handStat = newStats.handStats[mapping.hand];
            handStat.count++;
            handStat.totalTime += log.time;
            if(log.state === 'incorrect' || log.state === 'corrected') {
                handStat.errors++;
            }
            handStat.errorRate = handStat.errors / handStat.count;
            handStat.avgTime = handStat.totalTime / handStat.count;
            handStat.wpm = handStat.avgTime > 0 ? (60 * 1000) / (handStat.avgTime * 5) : 0;
        }
    }

    const totalWpm = newStats.sessions.reduce((sum, s) => sum + s.wpm, 0);
    newStats.overallWpm = newStats.sessions.length > 0 ? totalWpm / newStats.sessions.length : 0;

    const totalAccuracy = newStats.sessions.reduce((sum, s) => sum + s.accuracy, 0);
    newStats.overallAccuracy = newStats.sessions.length > 0 ? totalAccuracy / newStats.sessions.length : 100;

    return newStats;
}
