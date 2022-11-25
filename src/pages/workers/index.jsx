import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicWorkers = dynamic(() => import('./Workers'), {
  suspense: true,
});

function HomeWorkers({ workers }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicWorkers workers={workers} />
    </Suspense>
  );
}

HomeWorkers.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { workers: data };
};

HomeWorkers.propTypes = {
  workers: PropTypes.node.isRequired,
};

export default HomeWorkers;
