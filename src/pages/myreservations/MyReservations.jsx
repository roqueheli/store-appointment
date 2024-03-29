import { useRouter } from 'next/router';
import React, {
  memo,
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';
import fadeIn from 'react-animations/lib/fade-in';
import Button from '../../components/Button';
import styles from './styles.module.css';
import ModalConfirmation from '../../components/ModalConfirmation';
import handlePrice from '../../utils/helpers';
import { StoreContext } from '../../context/store';

function ReservationCard({
  reservation,
  available,
  animationType,
  organization,
}) {
  const { bookingData, setBookingData } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const animation = keyframes`${animationType}`;
  const AnimationDiv = styled.div`
    animation: 2s ${animation};
  `;

  const handleEdit = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      setBookingData({
        ...bookingData,
        organization: {
          id: organization?.id,
          name: organization?.name,
          nid: organization?.nid,
          uri_web: organization?.uri_web,
          logo: organization?.logo,
        },
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
      router.push(`/service/${organization.nid}`);
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
    <AnimationDiv>
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
    </AnimationDiv>
  );
}

ReservationCard.propTypes = {
  reservation: PropTypes.node.isRequired,
  available: PropTypes.node.isRequired,
  animationType: PropTypes.node.isRequired,
  organization: PropTypes.node.isRequired,
};

const MyReservations = memo(({ organization }) => {
  const [reservations, setReservations] = useState(null);
  const router = useRouter();
  const backRef = useRef();

  useEffect(() => {
    (async () => {
      const userStorage = JSON.parse(sessionStorage.getItem('session'));
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}${userStorage?.token ? '' : 'guest/'}reservations/by_user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: userStorage?.token || '' },
          body: JSON.stringify({ email: userStorage.email }),
        });
        const data = await rs.json();
        if (rs.status === 200) {
          setReservations(data);
        }
      } catch (error) {
        setReservations({ error: 'Ha ocurrido un error intentando hacer submit' });
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Mis reservas</h1>
      </div>
      <div className={styles.subcontainer}>
        {reservations?.current?.length > 0 ? <h4>Próximas</h4> : ''}
        <ul>
          {reservations?.current?.map((reservation) => (
            <li key={reservation.id}>
              <ReservationCard
                reservation={reservation}
                available
                animationType={fadeIn}
                organization={organization}
              />
            </li>
          ))}
        </ul>
        {reservations?.old?.length > 0 ? <h4>Anteriores</h4> : ''}
        <ul>
          {reservations?.old?.map((reservation) => (
            <li key={reservation.id}>
              <ReservationCard
                reservation={reservation}
                animationType={fadeIn}
                organization={organization}
              />
            </li>
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
});

MyReservations.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default MyReservations;
