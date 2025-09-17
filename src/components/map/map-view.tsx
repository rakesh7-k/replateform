'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import { mockDonations } from '@/lib/data';
import type { Donation } from '@/lib/types';
import { Button } from '../ui/button';
import { formatDistanceToNow } from 'date-fns';

export default function MapView() {
  const position: [number, number] = [34.0522, -118.2437];

  return (
    <MapContainer center={position} zoom={11} scrollWheelZoom={false} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mockDonations.map((donation) => (
        <Marker key={donation.id} position={[donation.location.lat, donation.location.lng]}>
          <Popup>
            <div className="p-1 w-64">
                <h3 className="font-bold text-lg">{donation.foodType}</h3>
                <p className="text-base font-semibold text-primary">{donation.quantity}</p>
                <p className="text-sm text-muted-foreground mt-1">Pickup at: {donation.location.label}</p>
                <p className="text-sm text-muted-foreground">
                  Time left: {formatDistanceToNow(new Date(donation.pickupTime), { addSuffix: true })}
                </p>
                <Button size="sm" className="w-full mt-3">Claim</Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
