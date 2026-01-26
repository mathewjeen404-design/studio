'use client';

import { Award, Flame, Gem, Rocket, ShieldCheck, Star, Zap, Medal, Code } from 'lucide-react';
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
    id: 'speed-demon',
    icon: Zap,
    title: 'Speed Demon',
    description: 'Achieve over 100 WPM in a test.',
    isAchieved: (stats: any) => Math.max(0, ...stats.sessions.map((s: any) => s.wpm)) >= 100,
  },
  {
    id: 'accuracy-master',
    icon: ShieldCheck,
    title: 'Accuracy Master',
    description: 'Achieve 100% accuracy in a test.',
    isAchieved: (stats: any) => stats.sessions.some((s: any) => s.accuracy === 100),
  },
  {
    id: 'consistent-coder',
    icon: Star,
    title: 'Consistent Coder',
    description: 'Complete 10 typing tests.',
    isAchieved: (stats: any) => stats.totalTests >= 10,
  },
  {
    id: 'warp-speed',
    icon: Rocket,
    title: 'Warp Speed',
    description: 'Achieve over 150 WPM.',
    isAchieved: (stats: any) => Math.max(0, ...stats.sessions.map((s: any) => s.wpm)) >= 150,
  },
  {
    id: 'typing-veteran',
    icon: Award,
    title: 'Typing Veteran',
    description: 'Complete 100 typing tests.',
    isAchieved: (stats: any) => stats.totalTests >= 100,
  },
  {
    id: 'streak-starter',
    icon: Flame,
    title: 'Streak Starter',
    description: 'Maintain a 3-day streak.',
    isAchieved: (stats: any) => stats.longestStreak >= 3,
  },
  {
    id: 'adept-typist',
    icon: Gem,
    title: 'Adept Typist',
    description: 'Reach Level 10.',
    isAchieved: (stats: any) => stats.level >= 10,
  },
  {
    id: 'cert-wpm-40',
    icon: Medal,
    title: 'Certified 40 WPM',
    description: 'Achieve 40 WPM with >95% accuracy in a 60s+ test.',
    isAchieved: (stats: any) => stats.certifications.wpm40,
  },
  {
    id: 'cert-wpm-60',
    icon: Medal,
    title: 'Certified 60 WPM',
    description: 'Achieve 60 WPM with >95% accuracy in a 60s+ test.',
    isAchieved: (stats: any) => stats.certifications.wpm60,
  },
    {
    id: 'cert-wpm-80',
    icon: Medal,
    title: 'Certified 80 WPM',
    description: 'Achieve 80 WPM with >95% accuracy in a 60s+ test.',
    isAchieved: (stats: any) => stats.certifications.wpm80,
  },
  {
    id: 'cert-accuracy',
    icon: ShieldCheck,
    title: 'Accuracy Professional',
    description: 'Achieve 98% accuracy in a 60s+ test.',
    isAchieved: (stats: any) => stats.certifications.accuracyPro,
  },
  {
    id: 'cert-code',
    icon: Code,
    title: 'Code Typing Specialist',
    description: 'Pass a code test with >40 WPM and >96% accuracy.',
    isAchieved: (stats: any) => stats.certifications.codeSpecialist,
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
                  'aspect-square flex items-center justify-center rounded-lg border-2 p-4 transition-all',
                  badge.achieved
                    ? 'border-accent/80 bg-accent/10 text-accent'
                    : 'border-dashed border-muted-foreground/30 bg-muted/30 text-muted-foreground'
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
