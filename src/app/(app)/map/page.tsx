'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map/map-view'), {
  loading: () => <p>A map is loading...</p>,
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <MapView />
    </div>
  );
}
