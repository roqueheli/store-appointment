import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicPasswordReset = dynamic(() => import('./PasswordReset'), {
  suspense: true,
});

function HomePasswordReset({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicPasswordReset organization={organization} />
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

HomePasswordReset.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomePasswordReset;
