import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicLogin = dynamic(() => import('./Home'), {
  suspense: true,
});

function HomeLogin({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicLogin organization={organization} />
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

HomeLogin.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomeLogin;
