import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicPasswordReset = dynamic(() => import('./PasswordReset'), {
  suspense: true,
});

function HomePasswordReset() {
  return (
    <Suspense fallback="Loading...">
      <DynamicPasswordReset />
    </Suspense>
  );
}

export default HomePasswordReset;
