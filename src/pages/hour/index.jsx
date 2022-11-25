import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicHour = dynamic(() => import('./Hour'), {
  suspense: true,
});

function HomeHour() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicHour />
    </Suspense>
  );
}

export default HomeHour;
