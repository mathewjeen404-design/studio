'use client';
import { useLocalStorage } from './use-local-storage';
import { analyzeSession, DEFAULT_STATS as BASE_DEFAULT_STATS, generatePracticeText, getDifficulty } from '@/lib/intelligence';
import type { UserStats } from '@/lib/types';
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
    onboarding: {
      goal: 'balanced',
      level: 'beginner',
      complete: false,
    }
};

export function useTypingStats() {
    const [stats, setStats] = useLocalStorage<UserStats>('typing-stats', DEFAULT_STATS);

    const difficulty = useMemo(() => {
        if (stats.onboarding?.goal === 'speed') return 'hard';
        if (stats.onboarding?.goal === 'accuracy') return 'easy';
        return getDifficulty(stats.overallWpm, stats.overallAccuracy);
    }, [stats.overallWpm, stats.overallAccuracy, stats.onboarding?.goal]);

    const getNewTestText = useCallback((mode: string = 'words') => {
        return generatePracticeText(difficulty, stats, mode);
    }, [difficulty, stats]);

    const saveTestResult = useCallback((result: TestResult) => {
        const newStats = analyzeSession(result, stats);
        setStats(newStats);
    }, [stats, setStats]);
    
    const completeLevel = useCallback((level: number) => {
        setStats(prevStats => {
            if (level >= prevStats.unlockedLevel) {
                return { ...prevStats, unlockedLevel: prevStats.unlockedLevel + 1 };
            }
            return prevStats;
        });
    }, [setStats]);

    const resetStats = useCallback(() => {
        // Keep unlockedLevel, certifications and onboarding, reset everything else
        const currentUnlockedLevel = stats.unlockedLevel;
        const currentCerts = stats.certifications;
        const currentOnboarding = stats.onboarding;
        const freshStats = { ...DEFAULT_STATS, unlockedLevel: currentUnlockedLevel, certifications: currentCerts, onboarding: currentOnboarding };
        setStats(freshStats);
    }, [setStats, stats.unlockedLevel, stats.certifications, stats.onboarding]);

    const importStats = useCallback((newStats: any): newStats is UserStats => {
        // basic validation to ensure it looks like a stats object
        if (newStats && typeof newStats.totalTests === 'number' && Array.isArray(newStats.sessions)) {
            setStats(newStats as UserStats);
            return true;
        }
        return false;
    }, [setStats]);

    const saveOnboarding = useCallback((data: { goal: UserStats['onboarding']['goal'], level: UserStats['onboarding']['level'] }) => {
        setStats(prev => ({
            ...prev,
            onboarding: {
                goal: data.goal,
                level: data.level,
                complete: true,
            }
        }));
    }, [setStats]);


    return { stats, difficulty, getNewTestText, saveTestResult, resetStats, completeLevel, importStats, saveOnboarding };
}
