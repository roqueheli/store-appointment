import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicGuest = dynamic(() => import('./Guest'), {
  suspense: true,
});

function HomeGuest() {
  return (
    <Suspense fallback="Loading...">
      <DynamicGuest />
    </Suspense>
  );
}

export default HomeGuest;
