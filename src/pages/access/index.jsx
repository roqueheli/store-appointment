import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicAccess = dynamic(() => import('./Access'), {
  suspense: true,
});

function HomeAccess() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicAccess />
    </Suspense>
  );
}

export default HomeAccess;
