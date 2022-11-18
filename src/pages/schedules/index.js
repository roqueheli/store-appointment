import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const Schedules = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Horarios</h1>
      </div>
      <div className={styles.subcontainer}>
        <ul>
          <li>
            <label>Lunes</label>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <label>Martes</label>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <label>Miércoles</label>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <label>Jueves</label>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <label>Viernes</label>
            <span>11:00 - 20:00</span>
          </li>
          <li>
            <label>Sábado</label>
            <span>11:00 - 21:00</span>
          </li>
          <li>
            <label>Domingo</label>
            <span>11:00 - 19:00</span>
          </li>
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/'>
          <Button>
            Atrás
          </Button>
        </Link>
      </div>
    </div>
  );
}

Schedules.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}work_days`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(rs);
  const data = await rs.json()
  return { schedules: data }
}

export default Schedules;