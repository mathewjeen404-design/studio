import { Zap, Target, Timer, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

type StatsProps = {
  wpm: number;
  accuracy: number;
  errors: number;
  time: number;
};

const StatItem = ({
  icon: Icon,
  value,
  label,
  colorClass,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  colorClass: string;
}) => (
  <div className="flex items-center gap-2 md:gap-3">
    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${colorClass}`} />
    <div className="flex items-baseline gap-1">
      <span className="text-xl md:text-2xl font-bold font-mono">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  </div>
);

export default function Stats({ wpm, accuracy, errors, time }: StatsProps) {
  return (
    <Card className="p-3 md:p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatItem
          icon={Zap}
          value={wpm}
          label="WPM"
          colorClass="text-primary"
        />
        <StatItem
          icon={Target}
          value={`${accuracy}%`}
          label="ACC"
          colorClass="text-accent"
        />
        <StatItem
          icon={AlertTriangle}
          value={errors}
          label="Errors"
          colorClass="text-destructive"
        />
        <StatItem
          icon={Timer}
          value={time}
          label="Time"
          colorClass="text-muted-foreground"
        />
      </div>
    </Card>
  );
}
