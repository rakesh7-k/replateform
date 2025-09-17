'use client';

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { mockDonations } from '@/lib/data';
import type { Donation } from '@/lib/types';
import { Button } from '../ui/button';
import { formatDistanceToNow } from 'date-fns';

export default function MapView() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selected, setSelected] = useState<Donation | null>(null);

  if (!apiKey) {
    return (
      <div className="h-full flex items-center justify-center bg-muted">
        <p className="text-destructive font-semibold">Google Maps API key is missing. Please add it to your environment variables.</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
        defaultZoom={11}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'a2a35359a3c1c7a5'}
        className="w-full h-full"
      >
        {mockDonations.map((donation) => (
          <AdvancedMarker
            key={donation.id}
            position={donation.location}
            onClick={() => setSelected(donation)}
          >
            <Pin />
          </AdvancedMarker>
        ))}
        {selected && (
          <InfoWindow
            position={selected.location}
            onCloseClick={() => setSelected(null)}
          >
            <div className="p-2 w-64">
                <h3 className="font-bold text-lg">{selected.foodType}</h3>
                <p className="text-base font-semibold text-primary">{selected.quantity}</p>
                <p className="text-sm text-muted-foreground mt-1">Pickup at: {selected.location.label}</p>
                <p className="text-sm text-muted-foreground">
                  Time left: {formatDistanceToNow(new Date(selected.pickupTime), { addSuffix: true })}
                </p>
                <Button size="sm" className="w-full mt-3">Claim</Button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
