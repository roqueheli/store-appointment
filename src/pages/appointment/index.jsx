import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicAppointment = dynamic(() => import('./Appointment'), {
  suspense: true,
});

function HomeAppointment() {
  return (
    <Suspense fallback="Loading...">
      <DynamicAppointment />
    </Suspense>
  );
}

export default HomeAppointment;
