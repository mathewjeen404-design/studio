'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  wpm: {
    label: 'WPM',
    color: 'hsl(var(--primary))',
  },
  accuracy: {
    label: 'Accuracy',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function ProgressChart() {
  const { stats } = useTypingStats();
  
  const chartData = stats.sessions.map((session, index) => ({
      date: `Test ${index + 1}`,
      wpm: session.wpm,
      accuracy: session.accuracy
  })).slice(-20); // show last 20 sessions

  if (chartData.length === 0) {
      return (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
              <p className="text-muted-foreground">Complete a typing test to see your progress!</p>
          </div>
      )
  }

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-wpm)"
              stopOpacity={0.8}
            />
            <stop offset="95%" stopColor="var(--color-wpm)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-accuracy)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-accuracy)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          yAxisId="left"
          stroke="var(--color-wpm)"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="var(--color-accuracy)"
          tickLine={false}
          axisLine={false}
          domain={[50, 100]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="wpm"
          yAxisId="left"
          stroke="var(--color-wpm)"
          strokeWidth={2}
          fill="url(#colorWpm)"
        />
        <Area
          type="monotone"
          dataKey="accuracy"
          yAxisId="right"
          stroke="var(--color-accuracy)"
          strokeWidth={2}
          fill="url(#colorAccuracy)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
