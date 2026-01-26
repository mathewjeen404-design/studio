'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartData = [
  { date: '2024-07-01', wpm: 75, accuracy: 95 },
  { date: '2024-07-02', wpm: 78, accuracy: 96 },
  { date: '2024-07-03', wpm: 82, accuracy: 95 },
  { date: '2024-07-04', wpm: 80, accuracy: 97 },
  { date: '2024-07-05', wpm: 85, accuracy: 98 },
  { date: '2024-07-06', wpm: 88, accuracy: 97 },
  { date: '2024-07-07', wpm: 92, accuracy: 98 },
];

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
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
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
          domain={[80, 100]}
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
