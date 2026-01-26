import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

const leaderboardData = [
  { rank: 1, user: 'VelocityViper', wpm: 182, accuracy: 99.5, avatarSeed: 'v' },
  { rank: 2, user: 'QwertyQueen', wpm: 175, accuracy: 98.9, avatarSeed: 'q' },
  { rank: 3, user: 'AeroType', wpm: 171, accuracy: 100, avatarSeed: 'a' },
  { rank: 4, user: 'ChronoKeys', wpm: 168, accuracy: 97.2, avatarSeed: 'c' },
  { rank: 5, user: 'ByteBlazer', wpm: 165, accuracy: 99.1, avatarSeed: 'b' },
  { rank: 6, user: 'TypingTitan', wpm: 160, accuracy: 98.5, avatarSeed: 't' },
  { rank: 7, user: 'ShiftSavvy', wpm: 158, accuracy: 99.8, avatarSeed: 's' },
  { rank: 8, user: 'ZenithKeys', wpm: 155, accuracy: 96.5, avatarSeed: 'z' },
  { rank: 9, user: 'RapidFingers', wpm: 154, accuracy: 97.8, avatarSeed: 'r' },
  { rank: 10, user: 'KeyMaster', wpm: 152, accuracy: 98.2, avatarSeed: 'k' },
];

export function LeaderboardTable() {
  return (
    <div className="max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-center">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">WPM</TableHead>
            <TableHead className="text-right">Accuracy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell className="font-bold text-center text-lg">
                <div className="flex items-center justify-center">
                  {entry.rank === 1 && <Trophy className="w-6 h-6 text-yellow-400 mr-2" />}
                  {entry.rank === 2 && <Trophy className="w-6 h-6 text-gray-400 mr-2" />}
                  {entry.rank === 3 && <Trophy className="w-6 h-6 text-amber-600 mr-2" />}
                  {entry.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://picsum.photos/seed/${entry.avatarSeed}/40/40`}
                      alt={entry.user}
                    />
                    <AvatarFallback>{entry.avatarSeed.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{entry.user}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-primary font-bold">
                {entry.wpm}
              </TableCell>
              <TableCell className="text-right font-mono">
                {entry.accuracy.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
