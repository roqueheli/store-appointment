import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicWorker = dynamic(() => import('./Worker'), {
  suspense: true,
});

function Worker({ workers }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicWorker workers={workers} />
    </Suspense>
  );
}

Worker.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { workers: data };
};

Worker.propTypes = {
  workers: PropTypes.node.isRequired,
};

export default Worker;
