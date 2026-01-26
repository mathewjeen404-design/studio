'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { Wand2, Loader2, RefreshCw } from 'lucide-react';
import { getCoachingTip } from '@/ai/flows/coach-flow';
import { FINGERS } from '@/lib/intelligence';

// Infer types from the server action
type CoachingInput = Parameters<typeof getCoachingTip>[0];
type CoachingOutput = Awaited<ReturnType<typeof getCoachingTip>>;

export function AiCoachCard() {
  const { stats } = useTypingStats();
  const [loading, setLoading] = useState(false);
  const [coaching, setCoaching] = useState<CoachingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetCoaching = async () => {
    setLoading(true);
    setCoaching(null);
    setError(null);
    try {
        const topMistypedKeys = Object.values(stats.charStats)
            .sort((a, b) => b.errorRate - a.errorRate)
            .slice(0, 5)
            .map(s => s.char);
            
        const weakestFinger = FINGERS.map(finger => ({ name: finger, ...stats.fingerStats[finger] }))
            .sort((a, b) => a.wpm - b.wpm)[0]?.name || 'N/A';

        const input: CoachingInput = {
            overallWpm: stats.overallWpm,
            overallAccuracy: stats.overallAccuracy,
            consistency: stats.consistency,
            topMistypedKeys: topMistypedKeys,
            weakestFinger: weakestFinger
        };

        const result = await getCoachingTip(input);
        setCoaching(result);
    } catch (e) {
        console.error(e);
        setError("Couldn't get a coaching tip right now. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

  const canCoach = stats.totalTests > 2;

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Wand2 className="text-primary"/>
            <span>AI-Powered Coach</span>
        </CardTitle>
        <CardDescription>
            {canCoach ? "Get personalized feedback and a custom drill based on your performance." : "Complete a few more tests to unlock your AI coach."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {coaching && !loading && (
            <div className="space-y-4 animate-in fade-in-50">
                <div>
                    <h4 className="font-semibold mb-2">Verse's Feedback:</h4>
                    <p className="text-sm text-foreground/80">{coaching.feedback}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Your Custom Drill:</h4>
                    <Textarea readOnly value={coaching.drill} className="bg-background/50 font-mono" />
                </div>
            </div>
        )}

        {loading && (
            <div className="flex items-center justify-center h-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}

        {error && (
            <p className="text-sm text-destructive">{error}</p>
        )}

        <Button onClick={handleGetCoaching} disabled={loading || !canCoach}>
            {loading ? 'Analyzing...' : coaching ? <><RefreshCw className="mr-2 h-4 w-4"/>Generate New Tip</> : 'Get My First Tip'}
        </Button>
      </CardContent>
    </Card>
  );
}
