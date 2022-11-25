import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const DynamicWorkerDetail = dynamic(() => import('./WorkerDetail'), {
  suspense: true,
});

function HomeWorkerDetail({ worker }) {
  return (
    <Suspense fallback="Loading...">
      <DynamicWorkerDetail worker={worker} />
    </Suspense>
  );
}

HomeWorkerDetail.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers/${ctx.query.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { worker: data };
};

HomeWorkerDetail.propTypes = {
  worker: PropTypes.node.isRequired,
};

export default HomeWorkerDetail;
