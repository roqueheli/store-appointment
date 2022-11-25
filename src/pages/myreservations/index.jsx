import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const DynamicMyReservations = dynamic(() => import('./MyReservations'), {
  suspense: true,
});

function HomeMyReservations({ reservations }) {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicMyReservations reservations={reservations} />
    </Suspense>
  );
}

HomeMyReservations.getInitialProps = async () => {
  const userStorage = JSON.parse(sessionStorage.getItem('session'));
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}reservations/by_user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userStorage.email }),
  });
  const data = await rs.json();
  return { reservations: data };
};

HomeMyReservations.propTypes = {
  reservations: PropTypes.node.isRequired,
};

export default HomeMyReservations;
