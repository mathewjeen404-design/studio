'use client';

import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart, CheckCircle, Flame, Gauge, Gem, Star, BatteryWarning, Download, Upload } from 'lucide-react';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { getXpForNextLevel, getTypingPersonality } from '@/lib/intelligence';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useToast } from '@/hooks/use-toast';

export function ProfileCard() {
  const { stats, resetStats, importStats } = useTypingStats();
  const { toast } = useToast();
  const importInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleExport = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(stats, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      const date = new Date().toISOString().slice(0, 10);
      link.download = `typeverse-profile-${date}.json`;
      link.click();
      toast({
          title: "Profile Exported",
          description: "Your typing profile has been saved to your downloads.",
      });
    } catch (error) {
       toast({
            variant: "destructive",
            title: "Export Failed",
            description: "Could not export your profile.",
        });
    }
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
            throw new Error("File is not a valid text file.");
        }
        const importedData = JSON.parse(text);
        
        if (importStats(importedData)) {
            toast({
                title: "Profile Imported Successfully!",
                description: "Your progress has been restored.",
            });
        } else {
             throw new Error("Invalid profile file format.");
        }
      } catch (error) {
        toast({
            variant: "destructive",
            title: "Import Failed",
            description: error instanceof Error ? error.message : "Could not import the profile.",
        });
      }
    };
    reader.readAsText(file);
    // Reset file input to allow importing the same file again
    event.target.value = '';
  };


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
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Button onClick={handleExport} variant="outline" className="w-full">
                    <Download /> Export Profile
                </Button>
                <Button onClick={handleImportClick} variant="outline" className="w-full">
                    <Upload /> Import Profile
                </Button>
                <input
                    type="file"
                    ref={importInputRef}
                    onChange={handleImport}
                    accept="application/json"
                    className="hidden"
                />
            </div>
            <Button onClick={resetStats} variant="destructive" className="w-full">
                Reset Stats
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
