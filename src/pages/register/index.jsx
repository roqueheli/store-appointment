import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicRegister = dynamic(() => import('./Register'), {
  suspense: true,
});

function HomeRegister() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicRegister />
    </Suspense>
  );
}

export default HomeRegister;
