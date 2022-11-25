import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicPasswordChange = dynamic(() => import('./PasswordChange'), {
  suspense: true,
});

function HomePasswordChange() {
  return (
    <Suspense fallback="Loading...">
      <DynamicPasswordChange />
    </Suspense>
  );
}

export default HomePasswordChange;
