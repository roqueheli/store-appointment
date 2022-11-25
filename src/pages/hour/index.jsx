import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicHour = dynamic(() => import('./Hour'), {
  suspense: true,
});

function HomeHour() {
  return (
    <Suspense fallback="Loading...">
      <DynamicHour />
    </Suspense>
  );
}

export default HomeHour;
