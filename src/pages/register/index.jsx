import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicRegister = dynamic(() => import('./Register'), {
  suspense: true,
});

function HomeRegister() {
  return (
    <Suspense fallback="Loading...">
      <DynamicRegister />
    </Suspense>
  );
}

export default HomeRegister;
