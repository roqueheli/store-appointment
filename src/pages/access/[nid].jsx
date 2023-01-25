import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicAccess = dynamic(() => import('./Access'), {
  suspense: true,
});

function HomeAccess({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicAccess organization={organization} />
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

HomeAccess.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomeAccess;
