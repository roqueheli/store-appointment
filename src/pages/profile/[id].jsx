import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicProfileDetail = dynamic(() => import('./ProfileDetail'), {
  suspense: true,
});

function HomeProfile() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicProfileDetail />
    </Suspense>
  );
}

export default HomeProfile;
