'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { DonationCardProps } from '@/lib/types';
import { Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow, differenceInMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

export default function DonationCard({ donation, onAccept }: DonationCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const pickupDate = new Date(donation.pickupTime);
      const now = new Date();
      if (pickupDate < now) {
        return 'Expired';
      }
      return formatDistanceToNow(pickupDate, { addSuffix: true });
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000); // Update every minute

    return () => clearInterval(interval);
  }, [donation.pickupTime]);
  
  const handleAccept = async () => {
    setIsAccepting(true);
    await onAccept(donation.id);
    // In a real app, you might want to handle the post-acceptance state
    // For now, the parent component will handle showing a toast.
    setIsAccepting(false);
  };
  
  const minutesLeft = differenceInMinutes(new Date(donation.pickupTime), new Date());
  const badgeVariant = minutesLeft < 60 ? 'destructive' : 'secondary';

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] relative">
          <Image
            src={donation.imageUrl}
            alt={donation.foodType}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={donation.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold mb-2">{donation.foodType}</CardTitle>
          <Badge variant={badgeVariant}>{timeLeft}</Badge>
        </div>
        <p className="text-muted-foreground font-semibold text-lg">{donation.quantity}</p>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{donation.location.label} ({donation.distanceKm} km away)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Pickup: {new Date(donation.pickupTime).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          className="w-full rounded-xl text-base font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:scale-95" 
          onClick={handleAccept}
          disabled={isAccepting}
        >
          {isAccepting ? 'Accepting...' : 'Accept'}
        </Button>
      </CardFooter>
    </Card>
  );
}
