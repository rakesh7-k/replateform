import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function MapPage() {
  const MapView = useMemo(
    () =>
      dynamic(() => import('@/components/map/map-view'), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="h-[calc(100vh-4rem)]">
      <MapView />
    </div>
  );
}
