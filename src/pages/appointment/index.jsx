import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicAppointment = dynamic(() => import('./Appointment'), {
  suspense: true,
});

function HomeAppointment() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicAppointment />
    </Suspense>
  );
}

export default HomeAppointment;
