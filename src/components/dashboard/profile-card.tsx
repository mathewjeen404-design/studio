'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AtSign, BarChart, CheckCircle, Clock, Zap } from 'lucide-react';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { getDifficulty } from '@/lib/intelligence';
import { Button } from '../ui/button';

export function ProfileCard() {
  const { stats, resetStats } = useTypingStats();
  const { overallWpm, overallAccuracy, totalTimeTyping, totalTests } = stats;

  const bestWpm = Math.max(0, ...stats.sessions.map(s => s.wpm));
  const totalWordsTyped = Math.round(stats.sessions.reduce((acc, s) => acc + (s.rawWpm * (s.time/60)), 0));

  const difficulty = getDifficulty(overallWpm, overallAccuracy);

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
          <AvatarImage
            src="https://picsum.photos/seed/user-avatar/100/100"
            alt="User Avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-2xl">Typing Enthusiast</CardTitle>
        <CardDescription>
            {totalTests > 10 ? 'Seasoned Typist' : 'Newcomer'}
        </CardDescription>
        <div className="flex gap-2 pt-2">
          <Badge variant="secondary" className="capitalize">{difficulty}</Badge>
          <Badge variant="outline">Tests: {totalTests}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <Zap size={16} /> Best WPM
            </span>
            <span className="font-medium text-primary">{bestWpm.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <BarChart size={16} /> Average WPM
            </span>
            <span className="font-medium text-primary">{overallWpm.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <CheckCircle size={16} /> Average Accuracy
            </span>
            <span className="font-medium">{overallAccuracy.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <Clock size={16} /> Total Time Typing
            </span>
            <span className="font-medium">{(totalTimeTyping / 3600).toFixed(1)} hours</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <AtSign size={16} /> Words Typed
            </span>
            <span className="font-medium">{totalWordsTyped}</span>
          </div>
        </div>
         <Separator className="my-4" />
        <Button onClick={resetStats} variant="destructive" className="w-full">
            Reset All My Stats
        </Button>
      </CardContent>
    </Card>
  );
}
