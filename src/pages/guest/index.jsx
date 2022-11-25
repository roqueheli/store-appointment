import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicGuest = dynamic(() => import('./Guest'), {
  suspense: true,
});

function HomeGuest() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicGuest />
    </Suspense>
  );
}

export default HomeGuest;
