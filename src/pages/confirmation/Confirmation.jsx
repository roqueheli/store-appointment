import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Success from '../../components/Success/Success';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Confirmation({ organization }) {
  const [success, setSuccess] = useState(false);
  const { bookingData, setUser, user } = useContext(StoreContext);
  const router = useRouter();
  const reservationRef = useRef();
  const bookingRef = useRef();
  const loginRef = useRef();
  const backRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    let execMethod = 'POST';
    if (bookingData.reservation.id > 0) execMethod = 'PUT';
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}${bookingData.user.token !== '' ? '' : 'guest/'}reservations${execMethod === 'PUT' ? `/${bookingData.reservation.id}` : ''}`, {
          method: execMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userStorage?.token || ''}`,
          },
          body: JSON.stringify({
            firstname: bookingData.user.firstname,
            lastname: '',
            phone: bookingData.user?.phone || 0,
            day: bookingData.schedule.day,
            email: bookingData.user.email,
            user_id: bookingData.user.user_id,
            block_time_id: bookingData.schedule.block_time_id,
            work_day_id: bookingData.schedule.work_day_id,
            worker_id: bookingData.worker.worker_id,
            service_id: bookingData.service.service_id,
            rut: '',
            organization_id: bookingData.organization.id,
          }),
        });
        const data = await rs.json();
        if (rs.status === 201) {
          if (execMethod === 'POST') {
            setSuccess(!success);
            if (bookingData.user.user_id === 0) setUser(null);
            if (bookingData.user.user_id === 0 && user.avatar !== '') sessionStorage.removeItem('session');
            setTimeout(() => {
              router.push(`/login/${organization?.nid}`);
            }, 4000);
          } else {
            router.push(`/myreservations/${organization?.nid}`);
          }
        } else {
          setUser({ error: data });
        }
      } catch (error) {
        setUser({ error });
      }
    })();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Confirmación</h1>
      </div>
      <div className={styles.subcontainer}>
        {!success
          ? (
            <>
              <h3>Servicio</h3>
              <Card key={bookingData.service.name} service={bookingData.service} />
              <h3>Barbero</h3>
              <Card key={bookingData.worker.name} service={bookingData.worker} />
              <h3>Fecha</h3>
              <Card key={bookingData.schedule.id} service={bookingData.schedule} />
            </>
          ) : <Success />}
      </div>
      <div className={styles.btnContainer}>
        {!success
          ? (
            <>
              <Button onClick={handleClick} ref={bookingRef}>
                Agendar
              </Button>
              <Link href={`/appointment/${organization?.nid}`}>
                <Button ref={backRef}>
                  Atrás
                </Button>
              </Link>
            </>
          )
          : (
            <>
              <Link href={`/login/${organization?.nid}`}>
                <Button ref={loginRef}>
                  Inicio
                </Button>
              </Link>
              {bookingData.user.user_id > 0
                ? (
                  <Link href={`/myreservations/${organization?.nid}`}>
                    <Button ref={reservationRef}>
                      Mis reservas
                    </Button>
                  </Link>
                )
                : ''}
            </>
          )}
      </div>
    </div>
  );
}

Confirmation.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default Confirmation;
