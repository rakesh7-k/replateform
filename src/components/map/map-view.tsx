'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { mockDonations } from '@/lib/data';
import { Button } from '../ui/button';
import { formatDistanceToNow } from 'date-fns';
import ReactDOMServer from 'react-dom/server';

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    // Prevent map from initializing multiple times
    if (mapRef.current && !mapInstance.current) {
      const position: [number, number] = [34.0522, -118.2437];
      
      mapInstance.current = L.map(mapRef.current).setView(position, 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      mockDonations.forEach((donation) => {
        const popupContent = L.DomUtil.create('div');
        const popupEl = (
          <div className="p-1 w-64">
            <h3 className="font-bold text-lg">{donation.foodType}</h3>
            <p className="text-base font-semibold text-primary">{donation.quantity}</p>
            <p className="text-sm text-muted-foreground mt-1">Pickup at: {donation.location.label}</p>
            <p className="text-sm text-muted-foreground">
              Time left: {formatDistanceToNow(new Date(donation.pickupTime), { addSuffix: true })}
            </p>
            {/* The button inside a popup requires more complex handling to be interactive, so it's disabled for now */}
            <Button size="sm" className="w-full mt-3" disabled>Claim</Button>
          </div>
        );
        popupContent.innerHTML = ReactDOMServer.renderToString(popupEl);
        
        L.marker([donation.location.lat, donation.location.lng])
          .addTo(mapInstance.current!)
          .bindPopup(popupContent);
      });
    }

    // Cleanup function to run when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <div ref={mapRef} className="w-full h-full" />;
}
