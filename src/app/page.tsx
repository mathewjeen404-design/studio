'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import TypingTest from '@/components/typing-test';
import { Footer } from '@/components/layout/footer';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { OnboardingModal } from '@/components/onboarding-modal';


export default function Home() {
  const { stats } = useTypingStats();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // This timeout prevents a flash of the onboarding modal on page load for existing users.
    const timer = setTimeout(() => {
        if (stats.onboarding) {
            setShowOnboarding(!stats.onboarding.complete);
        } else {
            setShowOnboarding(true);
        }
    }, 100);

    return () => clearTimeout(timer);
  }, [stats.onboarding]);


  return (
    <div className="flex min-h-screen flex-col">
      <OnboardingModal isOpen={showOnboarding} onOpenChange={setShowOnboarding} />
      <Header />
      <main className="flex flex-1 flex-col">
        <div className="container flex-1 flex flex-col items-center justify-center gap-8 px-4 py-12 md:py-24">
          <TypingTest />
        </div>
      </main>
      <Footer />
    </div>
  );
}
