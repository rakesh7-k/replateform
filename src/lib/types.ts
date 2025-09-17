export type Donation = {
  id: string;
  imageUrl: string;
  imageHint: string;
  foodType: string;
  quantity: string;
  pickupTime: string; // ISO
  location: { lat: number; lng: number; label?: string };
  distanceKm?: number;
  timeLeftMinutes?: number;
  createdAt: string; // ISO
};

export type DonationCardProps = {
  donation: Donation;
  onAccept: (id: string) => Promise<void>;
};

export type Stat = {
  label: string;
  value: number;
  unit: string;
};

export type ChartData = {
  date: string;
  donations: number;
};

export type PieChartData = {
  name: string;
  value: number;
  fill: string;
};
