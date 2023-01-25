import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicService = dynamic(() => import('./Service'), {
  suspense: true,
});

function Service({ services }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicService services={services} />
    </Suspense>
  );
}

export async function getServerSideProps({ params }) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services/by_org_nid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nid: params.nid }),
  });
  const services = await rs.json();
  return { props: { services } };
}

Service.propTypes = {
  services: PropTypes.node.isRequired,
};

export default Service;
