'use client';
import { useLocalStorage } from './use-local-storage';
import { analyzeSession, DEFAULT_STATS as BASE_DEFAULT_STATS, generatePracticeText, getDifficulty } from '@/lib/intelligence';
import type { UserStats, TestResult } from '@/lib/types';
import { useMemo, useCallback } from 'react';

export const DEFAULT_STATS: UserStats = {
    ...BASE_DEFAULT_STATS,
    unlockedLevel: 1,
    certifications: {
        wpm40: false,
        wpm60: false,
        wpm80: false,
        accuracyPro: false,
        codeSpecialist: false,
    },
    fatigueIndex: 0,
};

export function useTypingStats() {
    const [stats, setStats] = useLocalStorage<UserStats>('typing-stats', DEFAULT_STATS);

    const difficulty = useMemo(() => {
        return getDifficulty(stats.overallWpm, stats.overallAccuracy);
    }, [stats.overallWpm, stats.overallAccuracy]);

    const getNewTestText = useCallback((mode: string = 'words') => {
        return generatePracticeText(difficulty, stats, mode);
    }, [difficulty, stats]);

    const saveTestResult = useCallback((result: TestResult) => {
        const newStats = analyzeSession(result, stats);
        setStats(newStats);
    }, [stats, setStats]);
    
    const completeLevel = useCallback((level: number) => {
        setStats(prevStats => {
            if (level === prevStats.unlockedLevel) {
                return { ...prevStats, unlockedLevel: prevStats.unlockedLevel + 1 };
            }
            return prevStats;
        });
    }, [setStats]);

    const resetStats = useCallback(() => {
        // Keep unlockedLevel and certifications, reset everything else
        const currentUnlockedLevel = stats.unlockedLevel;
        const currentCerts = stats.certifications;
        const freshStats = { ...DEFAULT_STATS, unlockedLevel: currentUnlockedLevel, certifications: currentCerts };
        setStats(freshStats);
    }, [setStats, stats.unlockedLevel, stats.certifications]);

    return { stats, difficulty, getNewTestText, saveTestResult, resetStats, completeLevel };
}
