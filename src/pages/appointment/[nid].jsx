import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader';

const DynamicAppointment = dynamic(() => import('./Appointment'), {
  suspense: true,
});

function HomeAppointment({ organization }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicAppointment organization={organization} />
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

HomeAppointment.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default HomeAppointment;
