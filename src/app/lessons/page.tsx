import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CurriculumMap } from '@/components/lessons/curriculum-map';
import { GraduationCap } from 'lucide-react';

export default function LessonsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col items-center text-center mb-12">
            <GraduationCap className="w-16 h-16 mb-4 text-primary" />
            <h1 className="text-4xl font-headline font-bold">
              Typing Lessons
            </h1>
            <p className="text-muted-foreground max-w-2xl mt-2">
              Follow our structured curriculum to build your typing skills from the ground up. Master new keys with each level.
            </p>
          </div>
          <CurriculumMap />
        </div>
      </main>
      <Footer />
    </div>
  );
}
