import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedCounter from './animated-counter';
import type { Stat } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  stat: Stat;
  Icon: LucideIcon;
}

export default function StatCard({ stat, Icon }: StatCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter endValue={stat.value} />
          {stat.unit && <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
