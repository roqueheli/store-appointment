import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicConfirmation = dynamic(() => import('./Confirmation'), {
  suspense: true,
});

function HomeConfirmation() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicConfirmation />
    </Suspense>
  );
}

export default HomeConfirmation;
