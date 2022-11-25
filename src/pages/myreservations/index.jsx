import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Button from '../../components/Button';
import styles from './styles.module.css';
import ModalConfirmation from '../../components/ModalConfirmation';
import handlePrice from '../../utils/helpers';
import { StoreContext } from '../../context/store';

function ReservationCard({ reservation, available }) {
  const { bookingData, setBookingData } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleEdit = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      setBookingData({
        ...bookingData,
        user: {
          user_id: userStorage.user_id,
          firstname: userStorage.username,
          phone: userStorage?.phone || 0,
          email: userStorage.email,
          token: userStorage?.token,
        },
        reservation: {
          id: reservation.id,
        },
      });
      router.push('/service');
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' || event.keyCode === 27) {
        setShowModal(false);
      }
    });
  }, []);

  return (
    <>
      {showModal ? <ModalConfirmation onClose={() => setShowModal(false)} setShowModal={setShowModal} reservation={reservation} title="¿Desea eliminar la reserva?" /> : ''}
      <div className={styles.reservationcard}>
        <div className={styles.leftside}>
          <em>{new Date(reservation.day).toLocaleString('es-ES', { month: 'short' })}</em>
          <b>{new Date(reservation.day).getDate()}</b>
          <time>{`${new Date(reservation.block_time.start).toISOString().slice(11, 16)}`}</time>
        </div>
        <div className={styles.rightside}>
          <h5>{reservation.service.name}</h5>
          <div className={styles.servicedetails}>
            <span>{reservation.worker.name}</span>
            <span>{`${handlePrice(reservation.service.price)}`}</span>
          </div>
          {available
            ? (
              <div className={styles.icons}>
                <button type="button" onClick={handleEdit}>
                  <FiEdit size={14} />
                </button>
                <button type="button" onClick={() => setShowModal(true)}>
                  <MdOutlineDelete size={17} />
                </button>
              </div>
            )
            : ''}
        </div>
      </div>
    </>
  );
}

ReservationCard.propTypes = {
  reservation: PropTypes.node.isRequired,
  available: PropTypes.node.isRequired,
};

function MyReservations({ reservations }) {
  const router = useRouter();
  const backRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Mis reservas</h1>
      </div>
      <div className={styles.subcontainer}>
        {reservations.current?.length > 0 ? <h4>Próximas</h4> : ''}
        <ul>
          {reservations?.current.map((reservation) => (
            <li key={reservation.id}><ReservationCard reservation={reservation} available /></li>
          ))}
        </ul>
        {reservations.old.length > 0 ? <h4>Anteriores</h4> : ''}
        <ul>
          {reservations?.old.map((reservation) => (
            <li key={reservation.id}><ReservationCard reservation={reservation} /></li>
          ))}
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={() => router.back()} ref={backRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

MyReservations.getInitialProps = async () => {
  const userStorage = JSON.parse(sessionStorage.getItem('session'));
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}reservations/by_user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userStorage.email }),
  });
  const data = await rs.json();
  return { reservations: data };
};

MyReservations.propTypes = {
  reservations: PropTypes.node.isRequired,
};

export default MyReservations;
