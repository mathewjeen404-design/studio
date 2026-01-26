import { Award, Rocket, ShieldCheck, Star, Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const badges = [
  {
    icon: Zap,
    title: 'Speed Demon',
    description: 'Achieve over 100 WPM in a 1-minute test.',
    achieved: true,
  },
  {
    icon: ShieldCheck,
    title: 'Accuracy Master',
    description: 'Achieve 100% accuracy in a 1-minute test.',
    achieved: true,
  },
  {
    icon: Star,
    title: 'Consistent Coder',
    description: 'Complete a session every day for 7 days.',
    achieved: true,
  },
  {
    icon: Rocket,
    title: 'Warp Speed',
    description: 'Achieve over 150 WPM.',
    achieved: false,
  },
  {
    icon: Award,
    title: 'Typing Veteran',
    description: 'Complete 100 typing tests.',
    achieved: false,
  },
];

export function BadgesGrid() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {badges.map((badge, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'aspect-square flex items-center justify-center rounded-lg border-2 p-4 transition-all',
                  badge.achieved
                    ? 'border-accent/80 bg-accent/10 text-accent'
                    : 'border-dashed border-muted-foreground/30 bg-muted/30 text-muted-foreground'
                )}
              >
                <badge.icon
                  className={cn(
                    'h-10 w-10',
                    badge.achieved && 'filter saturate-150'
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{badge.title}</p>
              <p className="text-sm text-muted-foreground">
                {badge.description}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
