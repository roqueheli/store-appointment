import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicLogin = dynamic(() => import('./Home'), {
  suspense: true,
});

function HomeLogin() {
  return (
    <Suspense fallback="Loading...">
      <DynamicLogin />
    </Suspense>
  );
}

export default HomeLogin;
