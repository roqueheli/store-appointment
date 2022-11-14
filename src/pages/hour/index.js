import Link from 'next/link';
import React, { useRef } from 'react'
import Button from '../../components/Button';
import styles from './styles.module.css';

const Hour = () => {
  const buttonRef = useRef();
  const serviceRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Hora</h1>
      </div>
      <div className={styles.subcontainer}>
        <ul>
          <li>11:00</li>
          <li>11:30</li>
          <li>12:00</li>
          <li>12:30</li>
          <li>13:00</li>
          <li>13:30</li>
          <li>14:00</li>
          <li>14:30</li>
          <li>15:00</li>
          <li>15:30</li>
          <li>16:00</li>
          <li>16:30</li>
          <li>17:00</li>
          <li>17:30</li>
          <li>18:00</li>
          <li>18:30</li>
          <li>19:00</li>
          <li>19:30</li>
          <li>20:00</li>
          <li>20:30</li>
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/service'>
            <Button ref={serviceRef}>
            Siguiente
            </Button>
        </Link>
        <Link href='/appointment'>
            <Button ref={buttonRef}>
            Atrás
            </Button>
        </Link>
      </div>
    </div>
  )
}

export default Hour;