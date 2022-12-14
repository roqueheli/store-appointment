import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicLogin = dynamic(() => import('./Login'), {
  suspense: true,
});

function Login() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicLogin />
    </Suspense>
  );
}

export default Login;
