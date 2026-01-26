'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { useTypingStats } from '@/hooks/use-typing-stats';

export function LeaderboardTable() {
    const { stats } = useTypingStats();

    const leaderboardData = stats.sessions
        .sort((a, b) => b.wpm - a.wpm)
        .slice(0, 10)
        .map((session, index) => ({
            rank: index + 1,
            user: `Test ${stats.sessions.indexOf(session) + 1}`,
            wpm: session.wpm,
            accuracy: session.accuracy,
            avatarSeed: String(stats.sessions.indexOf(session) + 1)
        }));

    if (leaderboardData.length === 0) {
        return (
            <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
                <p className="text-muted-foreground">Complete some tests to see your high scores!</p>
            </div>
        )
    }


  return (
    <div className="max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-center">Rank</TableHead>
            <TableHead>Session</TableHead>
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
                    <AvatarFallback>{entry.avatarSeed}</AvatarFallback>
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
