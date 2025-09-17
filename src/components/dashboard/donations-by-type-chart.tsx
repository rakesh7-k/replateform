'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import { mockPieChartData } from '@/lib/data';

export default function DonationsByTypeChart() {
  return (
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <CardTitle>Donation Breakdown</CardTitle>
        <CardDescription>Distribution of donations by food type.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={mockPieChartData} dataKey="value" nameKey="name" innerRadius={60} />
            <Legend content={<ChartLegendContent />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
