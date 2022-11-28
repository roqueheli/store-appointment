import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicLogin = dynamic(() => import('./Home'), {
  suspense: true,
});

function HomeLogin() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicLogin />
    </Suspense>
  );
}

export default HomeLogin;
