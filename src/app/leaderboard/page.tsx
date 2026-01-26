import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-4xl font-headline font-bold mb-8 text-center">
            Leaderboard
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            See how you stack up against the fastest typists in the verse.
          </p>
          <LeaderboardTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}
