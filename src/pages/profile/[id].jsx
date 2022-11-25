import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicProfileDetail = dynamic(() => import('./ProfileDetail'), {
  suspense: true,
});

function HomeProfile() {
  return (
    <Suspense fallback="Loading...">
      <DynamicProfileDetail />
    </Suspense>
  );
}

export default HomeProfile;
