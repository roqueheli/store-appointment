import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicPasswordChange = dynamic(() => import('./PasswordChange'), {
  suspense: true,
});

function HomePasswordChange() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicPasswordChange />
    </Suspense>
  );
}

export default HomePasswordChange;
