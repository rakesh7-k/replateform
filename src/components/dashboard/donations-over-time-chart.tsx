'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { mockChartData } from '@/lib/data';
import { format } from 'date-fns';


const chartConfig = {
  donations: {
    label: 'Donations',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function DonationsOverTimeChart() {
  const data = mockChartData.map(d => ({...d, date: new Date(d.date)}));

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Donations This Week</CardTitle>
        <CardDescription>A look at the number of donations made each day.</CardDescription>
      </CardHeader>
      <CardContent>
         <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => format(value, 'EEE')}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip 
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="donations" fill="var(--color-donations)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
