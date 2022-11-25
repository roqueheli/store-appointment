import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicProfile = dynamic(() => import('./Profile'), {
  suspense: true,
});

function HomeProfile() {
  return (
    <Suspense fallback="Loading...">
      <DynamicProfile />
    </Suspense>
  );
}

export default HomeProfile;
