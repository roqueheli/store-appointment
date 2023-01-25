import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicProfileDetail = dynamic(() => import('./ProfileDetail'), {
  suspense: true,
});

function HomeProfileDetail({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicProfileDetail organization={organization} />
    </Suspense>
  );
}

export async function getServerSideProps(ctx) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}organizations/${ctx.query.slug[0]}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const organization = await rs.json();
  return { props: { organization } };
}

HomeProfileDetail.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomeProfileDetail;
