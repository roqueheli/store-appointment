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

export async function getServerSideProps(ctx) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers/by_org_nid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nid: ctx.query.nid }),
  });
  const workers = await rs.json();
  return { props: { workers } };
}

HomeWorkers.propTypes = {
  workers: PropTypes.node.isRequired,
};

export default HomeWorkers;
