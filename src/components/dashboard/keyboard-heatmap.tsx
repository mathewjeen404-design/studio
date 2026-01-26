'use client';

import { useTypingStats } from '@/hooks/use-typing-stats';
import VirtualKeyboard from '../virtual-keyboard';
import type { KeyStat } from '@/lib/types';
import { keyDisplayMap } from '../virtual-keyboard';

export function KeyboardHeatmap() {
    const { stats } = useTypingStats();

    if (stats.totalTests < 3) {
      return (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
              <p className="text-muted-foreground text-center">Complete a few more tests to generate your keyboard heatmap.</p>
          </div>
      )
    }

    const keyColors: { [keyCode: string]: string } = {};
    const heatmapStats = stats.charStats;

    if (heatmapStats) {
        const maxErrorRate = Math.max(...Object.values(heatmapStats).map(s => s.errorRate), 0);

        for (const keyCode in keyDisplayMap) {
            const char = keyDisplayMap[keyCode]?.toLowerCase();
            if (!char) continue;

            const stat = heatmapStats[char];
            if (stat && stat.errorRate > 0) {
                const intensity = maxErrorRate > 0 ? stat.errorRate / maxErrorRate : 0;
                // from blue (hue 210) to yellow (60) to red (0)
                const hue = 210 - (intensity * 210);
                keyColors[keyCode] = `hsla(${hue}, 100%, 60%, ${0.3 + intensity * 0.6})`;
            }
        }
    }


    return (
        <div className='flex flex-col items-center'>
            <VirtualKeyboard pressedKey={null} keyColors={keyColors} />
            <div className="w-full max-w-lg flex justify-between mt-4 text-xs text-muted-foreground">
                <span>Cool (Low Errors)</span>
                <span>Hot (High Errors)</span>
            </div>
             <div className="w-full max-w-lg h-2 rounded-full bg-gradient-to-r from-sky-400 via-yellow-400 to-red-600 opacity-70 mt-1" />
        </div>
    );
}
