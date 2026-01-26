'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  errors: {
    label: 'Errors',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export function MistypedKeysChart() {
  const { stats } = useTypingStats();

  const chartData = Object.values(stats.charStats)
    .filter(charStat => charStat.errors > 0)
    .sort((a, b) => b.errors - a.errors)
    .slice(0, 10) // Top 10
    .map(charStat => ({
      name: charStat.char.toUpperCase(),
      errors: charStat.errors,
    }));
    
  if (chartData.length === 0) {
    return (
        <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
            <p className="text-muted-foreground">No mistyped keys yet. Keep practicing!</p>
        </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart data={chartData} accessibilityLayer layout="vertical">
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <XAxis type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar dataKey="errors" fill="var(--color-errors)" radius={4} layout="vertical" />
      </BarChart>
    </ChartContainer>
  );
}
