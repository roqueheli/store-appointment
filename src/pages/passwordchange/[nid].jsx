import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicPasswordChange = dynamic(() => import('./PasswordChange'), {
  suspense: true,
});

function HomePasswordChange({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicPasswordChange organization={organization} />
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

HomePasswordChange.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomePasswordChange;
