import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const DynamicService = dynamic(() => import('./Service'), {
  suspense: true,
});

function Service({ services }) {
  return (
    <Suspense fallback="Loading...">
      <DynamicService services={services} />
    </Suspense>
  );
}

Service.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { services: data };
};

Service.propTypes = {
  services: PropTypes.node.isRequired,
};

export default Service;
