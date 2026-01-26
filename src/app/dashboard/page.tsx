import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProfileCard } from '@/components/dashboard/profile-card';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { BadgesGrid } from '@/components/dashboard/badges-grid';
import { HandPerformanceChart } from '@/components/dashboard/hand-performance-chart';
import { FingerPerformanceChart } from '@/components/dashboard/finger-performance-chart';
import { Activity, Fingerprint, Hand, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-4xl font-headline font-bold mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity size={24} />
                    <span>Performance Over Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressChart />
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hand size={24} />
                      <span>Hand Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HandPerformanceChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fingerprint size={24} />
                      <span>Finger Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FingerPerformanceChart />
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy size={24} />
                    <span>Badges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgesGrid />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
