'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const DynamicMap = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/map-view'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return <Map />;
};

export default DynamicMap;
