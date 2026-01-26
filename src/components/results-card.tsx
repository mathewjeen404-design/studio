import type { TestResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Target, Zap, AlertTriangle, Clock, Waves } from 'lucide-react';
import SessionSummary from './session-summary';

type ResultsCardProps = {
  result: TestResult;
  onRestart: () => void;
};

export default function ResultsCard({ result, onRestart }: ResultsCardProps) {
  const { wpm, accuracy, errors, time, consistency } = result;

  return (
    <div className="w-full max-w-4xl space-y-4 animate-in fade-in-50 zoom-in-95">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">
            Test Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">WPM</span>
              <div className="flex items-baseline gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-5xl font-bold text-primary">{wpm}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <div className="flex items-baseline gap-2">
                <Target className="h-6 w-6 text-accent" />
                <span className="text-5xl font-bold text-accent">{accuracy}%</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Rhythm</span>
              <div className="flex items-baseline gap-2">
                <Waves className="h-6 w-6 text-blue-500" />
                <span className="text-5xl font-bold text-blue-500">{consistency}%</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Errors</span>
              <div className="flex items-baseline gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <span className="text-5xl font-bold text-destructive">
                  {errors}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Time</span>
              <div className="flex items-baseline gap-2">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <span className="text-5xl font-bold">{time}s</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <SessionSummary result={result} />

      <div className="flex justify-center">
        <Button onClick={onRestart} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
