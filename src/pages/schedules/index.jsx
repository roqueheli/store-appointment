import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicSchedules = dynamic(() => import('./Schedules'), {
  suspense: true,
});

function HomeSchedules() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicSchedules />
    </Suspense>
  );
}

export default HomeSchedules;
