import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicSchedules = dynamic(() => import('./Schedules'), {
  suspense: true,
});

function HomeSchedules() {
  return (
    <Suspense fallback="Loading...">
      <DynamicSchedules />
    </Suspense>
  );
}

export default HomeSchedules;
