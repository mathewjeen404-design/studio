import { Header } from '@/components/layout/header';
import TypingTest from '@/components/typing-test';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
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
