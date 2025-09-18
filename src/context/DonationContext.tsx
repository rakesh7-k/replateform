
'use client';

import React, aimport { useState, createContext, useContext } from 'react';
import type { Donation } from '@/lib/types';
import { mockDonations } from '@/lib/data';

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt' | 'imageUrl' | 'imageHint' | 'distanceKm'>) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);

  const addDonation = (donation: Omit<Donation, 'id' | 'createdAt' | 'imageUrl' | 'imageHint' | 'distanceKm'>) => {
    const newDonation: Donation = {
      ...donation,
      id: `dnt_${Date.now()}`,
      createdAt: new Date().toISOString(),
      // For now, let's use a random image from picsum
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/300`,
      imageHint: donation.foodType.toLowerCase(),
      distanceKm: parseFloat((Math.random() * 10).toFixed(1)),
      location: {
        ...donation.location,
        label: donation.location.label || 'User Location',
      }
    };
    setDonations(prevDonations => [newDonation, ...prevDonations]);
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
}
