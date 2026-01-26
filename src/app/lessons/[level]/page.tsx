'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LessonView } from '@/components/lessons/lesson-view';
import { LEVELS } from '@/lib/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LessonPage() {
  const params = useParams();
  const levelNumber = Number(params.level);
  const level = LEVELS.find(l => l.level === levelNumber);

  if (!level) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Level not found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The requested lesson level could not be found.</p>
                </CardContent>
            </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <LessonView level={level} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
