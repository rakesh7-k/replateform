
'use client';

import React, { useState, createContext, useContext } from 'react';
import type { Donation } from '@/lib/types';
import { mockDonations } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt' | 'imageUrl' | 'imageHint' | 'distanceKm'>) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);

  const addDonation = (donation: Omit<Donation, 'id' | 'createdAt' | 'imageUrl' | 'imageHint' | 'distanceKm'>) => {
    
    const getImageForFoodType = (foodType: string) => {
      const defaultImage = PlaceHolderImages.find(img => img.id === 'donation-meals')!;
      const foodTypeSimple = foodType.toLowerCase().split(' ')[0];
      const specificImage = PlaceHolderImages.find(img => img.id === `donation-${foodTypeSimple}`);
      return specificImage || defaultImage;
    };
    
    const imageInfo = getImageForFoodType(donation.foodType);

    const newDonation: Donation = {
      ...donation,
      id: `dnt_${Date.now()}`,
      createdAt: new Date().toISOString(),
      imageUrl: imageInfo.imageUrl,
      imageHint: imageInfo.imageHint,
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
