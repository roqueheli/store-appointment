import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

const ReservationCard = () => {
  return (
    <div className={styles.reservationcard}>
      <div className={styles.leftside}>
        <em>MAR</em>
        <b>20</b>
        <time dateTime='2022112022-11-21T14:00:00.000Z'>14:00</time>
      </div>
      <div className={styles.rightside}>
        <h5>Corte de Cabello + Lavado</h5>
        <div className={styles.servicedetails}>                
          <span>Lucio</span>
          <span>$10.000</span>
        </div>
      </div>
    </div>
  );
}

const MyReservations = ({ reservations }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Mis reservas</h1>
      </div>
        <div className={styles.subcontainer}>
          <h4>Próximas</h4>
          <ul>
            <li><ReservationCard /></li>
          </ul>
          <h4>Anteriores</h4>
          <ul>
            <li><ReservationCard /></li>
            <li><ReservationCard /></li>
            <li><ReservationCard /></li>
          </ul>
        </div>
        <div className={styles.btnContainer}>
          <Link href='/login'>
            <Button>
              Inicio
            </Button>
          </Link>
        </div>
    </div>
  );
}

MyReservations.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}reservations/by_user/${ctx.query.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await rs.json()
  return { reservations: data }
}

export default MyReservations;