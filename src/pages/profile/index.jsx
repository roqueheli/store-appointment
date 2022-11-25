import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicProfile = dynamic(() => import('./Profile'), {
  suspense: true,
});

function HomeProfile() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicProfile />
    </Suspense>
  );
}

export default HomeProfile;
