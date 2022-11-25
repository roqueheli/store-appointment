import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicServices = dynamic(() => import('./Services'), {
  suspense: true,
});

function HomeServices({ services }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicServices services={services} />
    </Suspense>
  );
}

HomeServices.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { services: data };
};

HomeServices.propTypes = {
  services: PropTypes.node.isRequired,
};

export default HomeServices;
