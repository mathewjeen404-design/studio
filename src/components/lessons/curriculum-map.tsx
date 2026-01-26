'use client';

import { useTypingStats } from '@/hooks/use-typing-stats';
import { LEVELS } from '@/lib/curriculum';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

export function CurriculumMap() {
  const { stats } = useTypingStats();
  const { unlockedLevel } = stats;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {LEVELS.map((level) => {
        const isUnlocked = level.level <= unlockedLevel;
        const isCompleted = level.level < unlockedLevel;

        return (
          <Card key={level.level} className={cn(!isUnlocked && 'bg-muted/50 border-dashed')}>
            <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle className="text-green-500" />
                  ) : !isUnlocked ? (
                    <Lock className="text-muted-foreground" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{level.level}</div>
                  )}
                  <span>{level.title}</span>
                </CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </div>
              <Link href={`/lessons/${level.level}`} passHref legacyBehavior>
                <Button asChild disabled={!isUnlocked} className="w-full sm:w-auto">
                  <a>
                    {isCompleted ? 'Review' : 'Start'}
                    <Play className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-muted-foreground">New Keys:</span>
                  {level.keys.map(key => (
                      <Badge key={key} variant="secondary" className="font-mono">{key}</Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
