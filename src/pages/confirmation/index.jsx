import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicConfirmation = dynamic(() => import('./Confirmation'), {
  suspense: true,
});

function HomeConfirmation() {
  return (
    <Suspense fallback="Loading...">
      <DynamicConfirmation />
    </Suspense>
  );
}

export default HomeConfirmation;
