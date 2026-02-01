import Link from 'next/link';
import { Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Keyboard className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              TypeHit
            </span>
          </Link>
          <nav className="flex items-center gap-2 md:gap-4 text-sm">
            <Button variant="ghost" asChild>
              <Link
                href="/"
                className="transition-colors text-foreground/80"
              >
                Practice
              </Link>
            </Button>
             <Button variant="ghost" asChild>
              <Link
                href="/lessons"
                className="transition-colors text-foreground/80"
              >
                Lessons
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href="/dashboard"
                className="transition-colors text-foreground/80"
              >
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href="/leaderboard"
                className="transition-colors text-foreground/80"
              >
                Leaderboard
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
