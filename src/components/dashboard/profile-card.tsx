'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart, CheckCircle, Flame, Gauge, Gem, Star, BatteryWarning } from 'lucide-react';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { getXpForNextLevel, getTypingPersonality } from '@/lib/intelligence';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export function ProfileCard() {
  const { stats, resetStats } = useTypingStats();
  const { 
    overallWpm, 
    overallAccuracy, 
    totalTests, 
    level, 
    xp, 
    consistency, 
    currentStreak, 
    longestStreak,
    fatigueIndex,
  } = stats;

  const xpForNext = getXpForNextLevel(level);
  const xpProgress = (xp / xpForNext) * 100;
  const personality = getTypingPersonality(stats);

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
            {personality}
        </CardDescription>
        <div className="flex gap-2 pt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Gem size={12} /> Level {level}
          </Badge>
          <Badge variant="outline">Tests: {totalTests}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>XP</span>
                <span>{xp.toFixed(0)} / {xpForNext}</span>
            </div>
          <Progress value={xpProgress} className="h-2" />
        </div>

        {fatigueIndex > 60 && (
            <div className="p-3 my-4 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                <BatteryWarning size={16} />
                <span>Your performance is dropping. Consider taking a break!</span>
            </div>
        )}
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Flame className="text-destructive" />
            <div>
              <div className="font-medium">{currentStreak} Days</div>
              <div className="text-muted-foreground text-xs">Current Streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-accent" />
            <div>
              <div className="font-medium">{longestStreak} Days</div>
              <div className="text-muted-foreground text-xs">Longest Streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="text-primary" />
            <div>
              <div className="font-medium">{overallWpm.toFixed(0)} WPM</div>
              <div className="text-muted-foreground text-xs">Average Speed</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <div>
              <div className="font-medium">{overallAccuracy.toFixed(1)}%</div>
              <div className="text-muted-foreground text-xs">Average Accuracy</div>
            </div>
          </div>
           <div className="flex items-center gap-2">
            <Gauge className="text-blue-500" />
            <div>
              <div className="font-medium">{consistency.toFixed(0)}%</div>
              <div className="text-muted-foreground text-xs">Consistency</div>
            </div>
          </div>
        </div>

         <Separator className="my-4" />
        <Button onClick={resetStats} variant="destructive" className="w-full">
            Reset Stats
        </Button>
      </CardContent>
    </Card>
  );
}
