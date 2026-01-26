import type { Difficulty, UserStats, KeyStat, TestResult, FingerName, HandName, FingerStat, CharLog } from './types';
import { words } from './words';
import { KEY_TO_FINGER_MAP } from './key-map';
import { REAL_WORLD_TEXTS } from './real-world-text';

const PUNCTUATION = ['.', ',', '?', '!', ';', ':'];
const SYMBOLS = ['(', ')', '[', ']', '{', '}', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '='];
const RARE_WORDS = ['ephemeral', 'ubiquitous', 'gregarious', 'idiosyncrasy', 'juxtaposition', 'mellifluous', 'pulchritudinous', 'sesquipedalian'];
export const FINGERS: FingerName[] = ['left-pinky', 'left-ring', 'left-middle', 'left-index', 'thumb', 'right-index', 'right-middle', 'right-ring', 'right-pinky'];
export const HANDS: HandName[] = ['left', 'right'];

export const XP_PER_LEVEL = 1000;

export const DEFAULT_STATS: Omit<UserStats, 'unlockedLevel'> = {
  sessions: [],
  charStats: {},
  fingerStats: FINGERS.reduce((acc, finger) => ({ ...acc, [finger]: { errors: 0, count: 0, totalTime: 0, avgTime: 0, errorRate: 0, wpm: 0 } }), {} as Record<FingerName, FingerStat>),
  handStats: HANDS.reduce((acc, hand) => ({ ...acc, [hand]: { errors: 0, count: 0, totalTime: 0, avgTime: 0, errorRate: 0, wpm: 0 } }), {} as Record<HandName, FingerStat>),
  overallWpm: 0,
  overallAccuracy: 100,
  totalTests: 0,
  totalTimeTyping: 0,
  // Gamification
  xp: 0,
  level: 1,
  consistency: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionTimestamp: null,
  certifications: {
    wpm40: false,
    wpm60: false,
    wpm80: false,
    accuracyPro: false,
    codeSpecialist: false,
  },
  fatigueIndex: 0,
};

export const getXpForNextLevel = (level: number) => {
    return Math.floor(XP_PER_LEVEL * Math.pow(1.2, level - 1));
}

export const getTypingPersonality = (stats: UserStats) => {
    const { overallWpm, overallAccuracy, consistency, totalTests, fatigueIndex } = stats;

    if (fatigueIndex > 70) return "Feeling Fatigued";
    if (overallWpm > 75 && overallAccuracy > 95) return "Speed Demon";
    if (overallAccuracy > 98) return "Accuracy Ace";
    if (consistency > 90 && overallWpm > 50) return "Rhythm Master";
    if (overallWpm > 60) return "Swift Typist";
    if (totalTests > 100) return "Seasoned Veteran";
    if (consistency < 70 && overallWpm > 40) return "Wildcard";
    
    return "Aspiring Typist";
}


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

    const topWeak = sorted.slice(0, count * 2);
    return topWeak.sort(() => Math.random() - 0.5).slice(0, count).map(c => c.char);
}

export function generatePracticeText(difficulty: Difficulty, userStats: UserStats, mode: string = 'words'): string {
    if (mode === 'email') {
        return REAL_WORLD_TEXTS.email[Math.floor(Math.random() * REAL_WORLD_TEXTS.email.length)];
    }
    if (mode === 'resume') {
        return REAL_WORLD_TEXTS.resume[Math.floor(Math.random() * REAL_WORLD_TEXTS.resume.length)];
    }
    if (mode === 'code') {
        const lang = Math.random() > 0.5 ? 'python' : 'javascript';
        const snippets = REAL_WORLD_TEXTS.code[lang as keyof typeof REAL_WORLD_TEXTS.code];
        return snippets[Math.floor(Math.random() * snippets.length)];
    }
    
    const wordCount = 30;
    let generatedWords: string[] = [];

    const weakChars = getWeakCharacters(userStats.charStats);

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

    for (let i = generatedWords.length; i < wordCount; i++) {
        generatedWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    
    generatedWords.sort(() => Math.random() - 0.5);

    let text = generatedWords.join(' ');

    if (difficulty === 'medium' || difficulty === 'hard') {
        text = text.split('. ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ');
        text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    if (difficulty === 'hard') {
        for (let i = 0; i < 5; i++) {
            const wordIndex = Math.floor(Math.random() * (generatedWords.length -1));
            const punctuation = PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
            generatedWords[wordIndex] += punctuation;
        }
        
        const rareWordIndex = Math.floor(Math.random() * (generatedWords.length - 1));
        generatedWords.splice(rareWordIndex, 1, RARE_WORDS[Math.floor(Math.random() * RARE_WORDS.length)]);

        const symbolIndex = Math.floor(Math.random() * (generatedWords.length - 1));
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        generatedWords.splice(symbolIndex, 0, symbol);
        
        text = generatedWords.join(' ');
    }
    
    const sentenceTarget = difficulty === 'easy' ? 2 : (difficulty === 'medium' ? 3 : 4);
    text = text.split('. ').slice(0, sentenceTarget).join('. ') || text;
    
    return text.slice(0, 300);
}

function isSameDay(ts1: number, ts2: number): boolean {
    const d1 = new Date(ts1);
    const d2 = new Date(ts2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

function isNextDay(ts1: number, ts2: number): boolean {
    const d1 = new Date(ts1);
    const d2 = new Date(ts2);
    const d1_tomorrow = new Date(d1);
    d1_tomorrow.setDate(d1.getDate() + 1);
    return d1_tomorrow.getFullYear() === d2.getFullYear() &&
           d1_tomorrow.getMonth() === d2.getMonth() &&
           d1_tomorrow.getDate() === d2.getDate();
}


export function analyzeSession(result: TestResult, oldStats: UserStats): UserStats {
    const newStats: UserStats = JSON.parse(JSON.stringify(oldStats));

    newStats.sessions.push(result);
    if(newStats.sessions.length > 50) { // Keep last 50 sessions
        newStats.sessions.shift();
    }

    newStats.totalTests += 1;
    newStats.totalTimeTyping += result.time;

    // GAMIFICATION
    // XP & Level
    const xpGained = Math.round((result.wpm * (result.accuracy / 100)) * (result.time / 60));
    newStats.xp += xpGained;
    let xpForNext = getXpForNextLevel(newStats.level);
    while (newStats.xp >= xpForNext) {
        newStats.level += 1;
        newStats.xp -= xpForNext;
        xpForNext = getXpForNextLevel(newStats.level);
    }
    
    // Streaks
    if (newStats.lastSessionTimestamp) {
        if (!isSameDay(newStats.lastSessionTimestamp, result.timestamp)) {
            if (isNextDay(newStats.lastSessionTimestamp, result.timestamp)) {
                newStats.currentStreak += 1;
            } else {
                newStats.currentStreak = 1;
            }
        }
    } else {
        newStats.currentStreak = 1;
    }
    newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
    newStats.lastSessionTimestamp = result.timestamp;

    // Fatigue
    const halfIndex = Math.floor(result.charLogs.length / 2);
    if (result.time > 45 && halfIndex > 10) { // Only check fatigue on longer tests
        const firstHalfLogs = result.charLogs.slice(0, halfIndex);
        const secondHalfLogs = result.charLogs.slice(halfIndex);

        const getPerf = (logs: CharLog[]) => {
            const time = logs.reduce((sum, log) => sum + log.time, 0) / 1000;
            const correctChars = logs.filter(l => l.state === 'correct').length;
            const wpm = (correctChars / 5) / (time / 60);
            const accuracy = (correctChars / logs.length) * 100;
            return { wpm, accuracy };
        };
        const firstHalfPerf = getPerf(firstHalfLogs);
        const secondHalfPerf = getPerf(secondHalfLogs);
        
        const wpmDrop = firstHalfPerf.wpm - secondHalfPerf.wpm;
        const accDrop = firstHalfPerf.accuracy - secondHalfPerf.accuracy;
        
        if (wpmDrop > firstHalfPerf.wpm * 0.2 && accDrop > 3) {
            newStats.fatigueIndex = Math.min(100, (newStats.fatigueIndex || 0) + 15);
        } else {
            newStats.fatigueIndex = Math.max(0, (newStats.fatigueIndex || 0) - 5);
        }
    } else {
        newStats.fatigueIndex = Math.max(0, (newStats.fatigueIndex || 0) - 5);
    }

    // Certifications
    if (result.time >= 60) {
        if (result.wpm >= 40 && result.accuracy >= 95) newStats.certifications.wpm40 = true;
        if (result.wpm >= 60 && result.accuracy >= 95) newStats.certifications.wpm60 = true;
        if (result.wpm >= 80 && result.accuracy >= 95) newStats.certifications.wpm80 = true;
        if (result.accuracy >= 98) newStats.certifications.accuracyPro = true;
    }
    if (result.mode === 'code' && result.wpm >= 40 && result.accuracy >= 96) {
        newStats.certifications.codeSpecialist = true;
    }

    // ANALYTICS
    for (const log of result.charLogs) {
        const char = log.char.toLowerCase();
        if (!char || char === ' ') continue;

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

    const recentSessions = newStats.sessions.slice(-10);
    const totalWpm = newStats.sessions.reduce((sum, s) => sum + s.wpm, 0);
    newStats.overallWpm = newStats.sessions.length > 0 ? totalWpm / newStats.sessions.length : 0;

    const totalAccuracy = newStats.sessions.reduce((sum, s) => sum + s.accuracy, 0);
    newStats.overallAccuracy = newStats.sessions.length > 0 ? totalAccuracy / newStats.sessions.length : 100;
    
    // Consistency
    if (recentSessions.length > 1) {
        const wpmValues = recentSessions.map(s => s.wpm);
        const meanWpm = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;
        const stdDev = Math.sqrt(wpmValues.map(w => Math.pow(w - meanWpm, 2)).reduce((a, b) => a + b, 0) / wpmValues.length);
        newStats.consistency = meanWpm > 0 ? Math.max(0, 100 - (stdDev / meanWpm) * 100) : 0;
    } else {
        newStats.consistency = 100;
    }

    return newStats;
}
