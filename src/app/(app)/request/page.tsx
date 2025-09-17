'use client';

import { useState, useMemo, useCallback } from 'react';
import DonationCard from '@/components/request/donation-card';
import Filters from '@/components/request/filters';
import { mockDonations } from '@/lib/data';
import type { Donation } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function RequestPage() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    distance: 25,
  });
  const { toast } = useToast();

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  const handleAccept = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Optimistically update UI
    setDonations(prevDonations => prevDonations.filter(d => d.id !== id));
    
    toast({
      title: "Donation Claimed!",
      description: "You've successfully claimed the donation. Pickup details have been sent to you.",
      variant: 'default',
    });
  };

  const filteredDonations = useMemo(() => {
    return donations.filter(donation => {
      const searchLower = filters.search.toLowerCase();
      const typeMatch = filters.type === 'all' || donation.foodType === filters.type;
      const distanceMatch = (donation.distanceKm ?? 0) <= filters.distance;
      const searchMatch =
        donation.foodType.toLowerCase().includes(searchLower) ||
        donation.location.label?.toLowerCase().includes(searchLower);

      return typeMatch && distanceMatch && searchMatch;
    });
  }, [donations, filters]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2 font-headline">Available Donations</h1>
      <p className="text-muted-foreground mb-8">Browse and claim food donations near you.</p>

      <Filters onFilterChange={handleFilterChange} />
      
      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map(donation => (
            <DonationCard key={donation.id} donation={donation} onAccept={handleAccept} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-2xl">
          <h2 className="text-2xl font-semibold">No Donations Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
}
