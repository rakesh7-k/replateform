'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { mockPieChartData } from '@/lib/data';

const chartConfig = {
  donations: {
    label: 'Donations',
  },
  'Fresh Produce': {
    label: 'Fresh Produce',
    color: 'hsl(var(--chart-1))',
  },
  'Prepared Meals': {
    label: 'Prepared Meals',
    color: 'hsl(var(--chart-2))',
  },
  Bakery: {
    label: 'Bakery',
    color: 'hsl(var(--chart-3))',
  },
  'Canned Goods': {
    label: 'Canned Goods',
    color: 'hsl(var(--chart-4))',
  },
  Other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function DonationsByTypeChart() {
  return (
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <CardTitle>Donation Breakdown</CardTitle>
        <CardDescription>Distribution of donations by food type.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={mockPieChartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
