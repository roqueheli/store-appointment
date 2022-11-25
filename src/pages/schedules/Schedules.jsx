import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

function Schedules() {
  const backRef = useRef();
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Horarios</h1>
      </div>
      <div className={styles.subcontainer}>
        <ul>
          <li>
            <span>Lunes</span>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <span>Martes</span>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <span>Miércoles</span>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <span>Jueves</span>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <span>Viernes</span>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <span>Sábado</span>
            <span>11:00 - 21:00</span>
          </li>
          <li>
            <span>Domingo</span>
            <span>11:00 - 19:00</span>
          </li>
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={handleBack} ref={backRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

Schedules.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}work_days`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { schedules: data };
};

export default Schedules;
