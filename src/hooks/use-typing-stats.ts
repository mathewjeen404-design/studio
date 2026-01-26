'use client';
import { useLocalStorage } from './use-local-storage';
import { analyzeSession, DEFAULT_STATS, generatePracticeText, getDifficulty } from '@/lib/intelligence';
import type { UserStats, TestResult } from '@/lib/types';
import { useMemo, useCallback } from 'react';

export function useTypingStats() {
    const [stats, setStats] = useLocalStorage<UserStats>('typing-stats', DEFAULT_STATS);

    const difficulty = useMemo(() => {
        return getDifficulty(stats.overallWpm, stats.overallAccuracy);
    }, [stats.overallWpm, stats.overallAccuracy]);

    const getNewTestText = useCallback(() => {
        return generatePracticeText(difficulty, stats);
    }, [difficulty, stats]);

    const saveTestResult = useCallback((result: TestResult) => {
        const newStats = analyzeSession(result, stats);
        setStats(newStats);
    }, [stats, setStats]);
    
    const resetStats = useCallback(() => {
        setStats(DEFAULT_STATS);
    }, [setStats]);

    return { stats, difficulty, getNewTestText, saveTestResult, resetStats };
}
