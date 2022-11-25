import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicPasswordReset = dynamic(() => import('./PasswordReset'), {
  suspense: true,
});

function HomePasswordReset() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicPasswordReset />
    </Suspense>
  );
}

export default HomePasswordReset;
