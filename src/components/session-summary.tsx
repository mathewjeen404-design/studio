'use client';

import { useEffect, useState } from 'react';
import { useTypingStats } from '@/hooks/use-typing-stats';
import type { TestResult, KeyStat } from '@/lib/types';
import { getSessionSummary } from '@/ai/flows/summary-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowUp, ArrowDown, Sparkles, Crosshair, BarChart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type SessionSummaryProps = {
  result: TestResult;
};

type SummaryAIType = Awaited<ReturnType<typeof getSessionSummary>> | null;

export default function SessionSummary({ result }: SessionSummaryProps) {
  const { stats } = useTypingStats();
  const [summary, setSummary] = useState<SummaryAIType>(null);
  const [loading, setLoading] = useState(true);

  const prevSession = stats.sessions.length > 1 ? stats.sessions[stats.sessions.length - 2] : null;
  const wpmImprovement = prevSession ? result.wpm - prevSession.wpm : 0;
  
  const sessionCharStats: {[key: string]: {char: string, errors: number, time: number, count: number}} = {};
  for (const log of result.charLogs) {
      if (!log.char || log.char === ' ') continue;
      const char = log.char.toLowerCase();
      if (!sessionCharStats[char]) {
          sessionCharStats[char] = { char, errors: 0, time: 0, count: 0 };
      }
      sessionCharStats[char].count++;
      sessionCharStats[char].time += log.time;
      if (log.state !== 'correct') {
          sessionCharStats[char].errors++;
      }
  }

  const sortedKeys = Object.values(sessionCharStats).sort((a,b) => {
      const aErrorRate = a.errors / a.count;
      const bErrorRate = b.errors / b.count;
      return bErrorRate - aErrorRate;
  });

  const weakestKeys = sortedKeys.slice(0, 3).filter(k => (k.errors / k.count) > 0);
  const bestKeys = sortedKeys.filter(k => k.errors === 0).slice(-3);


  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const input = {
          wpm: result.wpm,
          accuracy: result.accuracy,
          consistency: result.consistency,
          improvement: (wpmImprovement / (prevSession?.wpm || result.wpm)) * 100,
          weakestKeys: weakestKeys.map(k => k.char),
        };
        const aiSummary = await getSessionSummary(input);
        setSummary(aiSummary);
      } catch (error) {
        console.error("Failed to get AI summary:", error);
        setSummary(null); // Clear previous summary on error
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [result]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-headline">Session Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <CardDescription className="flex items-center gap-2 mb-1"><BarChart size={16}/> Performance</CardDescription>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{result.wpm} WPM</span>
              {wpmImprovement !== 0 && (
                <Badge variant={wpmImprovement > 0 ? 'secondary' : 'destructive'} className='gap-1'>
                  {wpmImprovement > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {Math.abs(wpmImprovement)} vs last
                </Badge>
              )}
            </div>
          </Card>
          
          <Card className="p-4">
             <CardDescription className="flex items-center gap-2 mb-1"><Crosshair size={16} /> Key Analysis</CardDescription>
             <div className="flex justify-between">
                <div>
                    <p className="text-sm font-medium">Weakest</p>
                    <div className="flex gap-1 mt-1">
                        {weakestKeys.length > 0 ? weakestKeys.map(k => <Badge key={k.char} variant="destructive">{k.char.toUpperCase()}</Badge>) : <span className="text-xs text-muted-foreground">None!</span>}
                    </div>
                </div>
                 <div>
                    <p className="text-sm font-medium text-right">Best</p>
                    <div className="flex gap-1 mt-1 justify-end">
                       {bestKeys.length > 0 ? bestKeys.map(k => <Badge key={k.char} variant="secondary" className='bg-green-500/20 text-green-700 dark:text-green-400'>{k.char.toUpperCase()}</Badge>) : <span className="text-xs text-muted-foreground">N/A</span>}
                    </div>
                </div>
             </div>
          </Card>
        </div>

        <Card className="p-4 bg-primary/5">
            <CardDescription className="flex items-center gap-2 mb-2"><Sparkles size={16}/> AI Coach</CardDescription>
            {loading ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm"><Loader2 size={16} className="animate-spin" /> Analyzing session...</div>
            ) : summary ? (
                <div className="space-y-1">
                    <p><span className="font-semibold">Today's Insight:</span> {summary.insight}</p>
                    <p><span className="font-semibold">Tomorrow's Focus:</span> {summary.focus}</p>
                </div>
            ): (
                <p className="text-sm text-muted-foreground">Could not generate AI insights for this session.</p>
            )}
        </Card>

      </CardContent>
    </Card>
  );
}
