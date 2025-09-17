'use client';

import { useEffect, useState } from 'react';
import MapView from '@/components/map/map-view';

const DynamicMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>A map is loading</p>;
  }

  return <MapView />;
};

export default DynamicMap;
