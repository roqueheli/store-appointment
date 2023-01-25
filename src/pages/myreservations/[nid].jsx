import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicMyReservations = dynamic(() => import('./MyReservations'), {
  suspense: true,
});

function HomeMyReservations({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicMyReservations organization={organization} />
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

HomeMyReservations.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomeMyReservations;
