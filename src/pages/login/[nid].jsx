import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicLogin = dynamic(() => import('./Login'), {
  suspense: true,
});

function Login({ organization }) {
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

Login.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default Login;
