import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const DynamicServiceDetail = dynamic(() => import('./ServiceDetail'), {
  suspense: true,
});

function HomeServiceDetail({ service }) {
  return (
    <Suspense fallback="Loading...">
      <DynamicServiceDetail service={service} />
    </Suspense>
  );
}

HomeServiceDetail.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services/${ctx.query.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { service: data };
};

HomeServiceDetail.propTypes = {
  service: PropTypes.node.isRequired,
};

export default HomeServiceDetail;
