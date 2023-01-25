import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicProfile = dynamic(() => import('./Profile'), {
  suspense: true,
});

function HomeProfile({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicProfile organization={organization} />
    </Suspense>
  );
}

export async function getServerSideProps(ctx) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}organizations/${ctx.query.nid}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const organization = await rs.json();
  return { props: { organization } };
}

HomeProfile.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomeProfile;
