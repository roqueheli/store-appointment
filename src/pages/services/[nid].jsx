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

export async function getServerSideProps(ctx) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services/by_org_nid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nid: ctx.query.nid }),
  });
  const services = await rs.json();
  return { props: { services } };
}

HomeServices.propTypes = {
  services: PropTypes.node.isRequired,
};

export default HomeServices;
