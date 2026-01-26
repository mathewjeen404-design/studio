'use client';

import { Award, Flame, Gem, Rocket, ShieldCheck, Star, Zap, Medal, Code, Activity, Coffee, Target } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTypingStats } from '@/hooks/use-typing-stats';

const allBadges = [
  {
    id: 'speed-breaker-50',
    icon: Rocket,
    title: 'Speed Breaker (50 WPM)',
    description: 'Achieve over 50 WPM in any test.',
    isAchieved: (stats: any) => Math.max(0, ...stats.sessions.map((s: any) => s.wpm)) >= 50,
  },
  {
    id: 'speed-breaker-75',
    icon: Zap,
    title: 'Speed Breaker (75 WPM)',
    description: 'Achieve over 75 WPM in any test.',
    isAchieved: (stats: any) => Math.max(0, ...stats.sessions.map((s: any) => s.wpm)) >= 75,
  },
   {
    id: 'speed-breaker-100',
    icon: Flame,
    title: 'Speed Breaker (100 WPM)',
    description: 'Achieve over 100 WPM in any test.',
    isAchieved: (stats: any) => Math.max(0, ...stats.sessions.map((s: any) => s.wpm)) >= 100,
  },
  {
    id: 'accuracy-champion-98',
    icon: ShieldCheck,
    title: 'Accuracy Champion (98%)',
    description: 'Achieve over 98% accuracy on a 60s+ test.',
    isAchieved: (stats: any) => stats.sessions.some((s: any) => s.accuracy >= 98 && s.time >= 60),
  },
  {
    id: 'accuracy-champion-100',
    icon: Target,
    title: 'Zero Error Run',
    description: 'Complete any test with 100% accuracy.',
    isAchieved: (stats: any) => stats.sessions.some((s: any) => s.accuracy === 100),
  },
  {
    id: 'consistency-king',
    icon: Activity,
    title: 'Consistency King',
    description: 'Achieve a consistency score of 90% or higher.',
    isAchieved: (stats: any) => stats.consistency >= 90,
  },
  {
    id: 'home-row-master',
    icon: Award,
    title: 'Home Row Master',
    description: 'Complete the home row curriculum (Level 3).',
    isAchieved: (stats: any) => stats.unlockedLevel > 3,
  },
  {
    id: 'typing-veteran-25',
    icon: Medal,
    title: 'Typing Veteran (25)',
    description: 'Complete 25 typing tests.',
    isAchieved: (stats: any) => stats.totalTests >= 25,
  },
  {
    id: 'typing-veteran-100',
    icon: Star,
    title: 'Typing Veteran (100)',
    description: 'Complete 100 typing tests.',
    isAchieved: (stats: any) => stats.totalTests >= 100,
  },
  {
    id: 'streak-active-3',
    icon: Flame,
    title: '3-Day Streak',
    description: 'Maintain a 3-day practice streak.',
    isAchieved: (stats: any) => stats.longestStreak >= 3,
  },
  {
    id: 'code-specialist',
    icon: Code,
    title: 'Code Specialist',
    description: 'Pass a code test with >40 WPM and >96% accuracy.',
    isAchieved: (stats: any) => stats.certifications.codeSpecialist,
  },
  {
    id: 'marathoner',
    icon: Coffee,
    title: 'Marathoner',
    description: 'Complete a 120-second test.',
    isAchieved: (stats: any) => stats.sessions.some((s: any) => s.time === 120),
  },
];

export function BadgesGrid() {
  const { stats } = useTypingStats();

  const badges = allBadges.map(badge => ({
    ...badge,
    achieved: badge.isAchieved(stats),
  }));

  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {badges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'aspect-square flex items-center justify-center rounded-lg border-2 p-4 transition-all duration-300',
                  badge.achieved
                    ? 'border-accent/80 bg-accent/10 text-accent'
                    : 'border-dashed border-muted-foreground/30 bg-muted/30 text-muted-foreground opacity-60'
                )}
              >
                <badge.icon
                  className={cn(
                    'h-10 w-10',
                    badge.achieved && 'filter saturate-150'
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{badge.title}</p>
              <p className="text-sm text-muted-foreground">
                {badge.description}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
