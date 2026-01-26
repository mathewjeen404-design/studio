'use client';

import { useTypingStats } from '@/hooks/use-typing-stats';
import VirtualKeyboard from '../virtual-keyboard';
import type { KeyStat } from '@/lib/types';
import { keyDisplayMap } from '../virtual-keyboard';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

export function KeyboardHeatmap() {
    const { stats } = useTypingStats();

    if (stats.totalTests < 3) {
      return (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
              <p className="text-muted-foreground text-center">Complete a few more tests to generate your keyboard heatmap.</p>
          </div>
      )
    }

    const keyData: { [keyCode: string]: { color: string; stats: KeyStat | null } } = {};
    const heatmapStats = stats.charStats;

    if (heatmapStats) {
        const errorRates = Object.values(heatmapStats).map(s => s.errorRate).filter(r => r > 0);
        const maxErrorRate = Math.max(...errorRates, 0);

        for (const keyCode in keyDisplayMap) {
            const char = keyDisplayMap[keyCode]?.toLowerCase();
            if (!char) continue;

            const stat = heatmapStats[char];
            if (stat) {
                const intensity = maxErrorRate > 0 ? stat.errorRate / maxErrorRate : 0;
                // from green (hue 120) to yellow (60) to red (0)
                const hue = 120 - (intensity * 120);
                const color = stat.errorRate > 0 ? `hsla(${hue}, 100%, 60%, ${0.2 + intensity * 0.7})` : 'hsla(120, 100%, 60%, 0.1)';
                keyData[keyCode] = { color, stats: stat };
            } else {
                keyData[keyCode] = { color: 'hsla(120, 100%, 60%, 0.1)', stats: null };
            }
        }
    }


    return (
        <TooltipProvider>
            <div className='flex flex-col items-center'>
                <VirtualKeyboard pressedKey={null} keyData={keyData} />
                <div className="w-full max-w-lg flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>Strong</span>
                    <span>Needs Practice</span>
                </div>
                <div className="w-full max-w-lg h-2 rounded-full bg-gradient-to-r from-green-500/70 via-yellow-500/70 to-red-600/70 mt-1" />
            </div>
        </TooltipProvider>
    );
}
