import StatCard from '@/components/dashboard/stat-card';
import DonationsOverTimeChart from '@/components/dashboard/donations-over-time-chart';
import DonationsByTypeChart from '@/components/dashboard/donations-by-type-chart';
import { mockStats } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, HeartHandshake, Leaf, Package } from 'lucide-react';

const icons = [HeartHandshake, Leaf, Package];

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Impact Dashboard</h1>
          <p className="text-muted-foreground">Your contributions are making a real difference.</p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {mockStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} Icon={icons[index % icons.length]} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <DonationsOverTimeChart />
        </div>
        <div className="md:col-span-2">
          <DonationsByTypeChart />
        </div>
      </div>
    </div>
  );
}
