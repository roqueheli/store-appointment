import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicAccess = dynamic(() => import('./Access'), {
  suspense: true,
});

function HomeAccess() {
  return (
    <Suspense fallback="Loading...">
      <DynamicAccess />
    </Suspense>
  );
}

export default HomeAccess;
