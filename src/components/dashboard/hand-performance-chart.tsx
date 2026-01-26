'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { HANDS } from '@/lib/intelligence';

const chartConfig = {
  wpm: {
    label: 'WPM',
    color: 'hsl(var(--primary))',
  },
  errorRate: {
    label: 'Error Rate',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export function HandPerformanceChart() {
  const { stats } = useTypingStats();
  
  const chartData = HANDS.map(hand => ({
    name: hand.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    wpm: stats.handStats[hand].wpm || 0,
    errorRate: (stats.handStats[hand].errorRate || 0) * 100,
  }));

  if (stats.totalTests === 0) {
      return (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
              <p className="text-muted-foreground">No data available yet. Complete a test!</p>
          </div>
      )
  }

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart data={chartData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis yAxisId="left" stroke="var(--color-wpm)" />
        <YAxis yAxisId="right" orientation="right" stroke="var(--color-errorRate)" unit="%" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="wpm" yAxisId="left" fill="var(--color-wpm)" radius={4} />
        <Bar dataKey="errorRate" yAxisId="right" fill="var(--color-errorRate)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
