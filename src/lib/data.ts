import { addHours, subHours, subDays } from 'date-fns';
import { Donation, Stat, ChartData, PieChartData } from './types';
import { PlaceHolderImages } from './placeholder-images';

const now = new Date();

const getImageForFoodType = (foodType: string) => {
  const genericFoodImage = PlaceHolderImages.find(img => img.id === 'donation-meals')!;
  const specificImage = PlaceHolderImages.find(img => img.id === `donation-${foodType.toLowerCase().split(' ')[0]}`);
  return specificImage || genericFoodImage;
};

export const mockDonations: Donation[] = [
  {
    id: 'd_001',
    imageUrl: getImageForFoodType('Sandwiches').imageUrl,
    imageHint: getImageForFoodType('Sandwiches').imageHint,
    foodType: 'Sandwiches',
    quantity: '20 meals',
    pickupTime: addHours(now, 2).toISOString(),
    location: { lat: 34.0522, lng: -118.2437, label: 'Downtown Cafe' },
    createdAt: subHours(now, 1).toISOString(),
    distanceKm: 2.5,
  },
  {
    id: 'd_002',
    imageUrl: getImageForFoodType('Bread').imageUrl,
    imageHint: getImageForFoodType('Bread').imageHint,
    foodType: 'Bread',
    quantity: '50 loaves',
    pickupTime: addHours(now, 1).toISOString(),
    location: { lat: 34.0622, lng: -118.2537, label: 'Artisan Bakery' },
    createdAt: subHours(now, 2).toISOString(),
    distanceKm: 5.1,
  },
  {
    id: 'd_003',
    imageUrl: getImageForFoodType('Fresh Produce').imageUrl,
    imageHint: getImageForFoodType('Fresh Produce').imageHint,
    foodType: 'Fresh Produce',
    quantity: '3 boxes',
    pickupTime: addHours(now, 4).toISOString(),
    location: { lat: 34.0422, lng: -118.2637, label: "Farmer's Market Stall" },
    createdAt: subHours(now, 3).toISOString(),
    distanceKm: 8.3,
  },
  {
    id: 'd_004',
    imageUrl: getImageForFoodType('Pastries').imageUrl,
    imageHint: getImageForFoodType('Pastries').imageHint,
    foodType: 'Pastries',
    quantity: '4 dozen',
    pickupTime: addHours(now, 0.5).toISOString(),
    location: { lat: 34.055, lng: -118.24, label: 'Sweet Treats Patisserie' },
    createdAt: subHours(now, 0.25).toISOString(),
    distanceKm: 1.2,
  },
    {
    id: 'd_005',
    imageUrl: getImageForFoodType('Canned Goods').imageUrl,
    imageHint: getImageForFoodType('Canned Goods').imageHint,
    foodType: 'Canned Goods',
    quantity: '100 cans',
    pickupTime: addHours(now, 24).toISOString(),
    location: { lat: 34.0722, lng: -118.2337, label: 'Community Center' },
    createdAt: subHours(now, 12).toISOString(),
    distanceKm: 12.0,
  },
  {
    id: 'd_006',
    imageUrl: getImageForFoodType('Prepared Meals').imageUrl,
    imageHint: getImageForFoodType('Prepared Meals').imageHint,
    foodType: 'Prepared Meals',
    quantity: '30 portions',
    pickupTime: addHours(now, 1.5).toISOString(),
    location: { lat: 34.0322, lng: -118.2237, label: 'University Canteen' },
    createdAt: subHours(now, 0.5).toISOString(),
    distanceKm: 3.8,
  },
];

export const mockStats: Stat[] = [
    { label: 'Meals Saved', value: 1287, unit: '' },
    { label: 'CO₂ Reduced (kg)', value: 3215, unit: 'kg' },
    { label: 'Donations Made', value: 432, unit: '' },
];

export const mockChartData: ChartData[] = [
    { date: subDays(now, 6).toISOString().split('T')[0], donations: 15 },
    { date: subDays(now, 5).toISOString().split('T')[0], donations: 22 },
    { date: subDays(now, 4).toISOString().split('T')[0], donations: 31 },
    { date: subDays(now, 3).toISOString().split('T')[0], donations: 28 },
    { date: subDays(now, 2).toISOString().split('T')[0], donations: 45 },
    { date: subDays(now, 1).toISOString().split('T')[0], donations: 38 },
    { date: new Date().toISOString().split('T')[0], donations: 52 },
];

export const mockPieChartData: PieChartData[] = [
    { name: 'Fresh Produce', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Prepared Meals', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Bakery', value: 300, fill: 'hsl(var(--chart-3))' },
    { name: 'Canned Goods', value: 200, fill: 'hsl(var(--chart-4))' },
    { name: 'Other', value: 278, fill: 'hsl(var(--chart-5))' },
];

export const foodTypes = ['Sandwiches', 'Bread', 'Fresh Produce', 'Pastries', 'Canned Goods', 'Prepared Meals', 'Dairy', 'Beverages'];
