import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';

const Appointment = () => {
  const buttonRef = useRef();
  const hourRef = useRef();
  const [date, onChange] = useState(null);

  const tileDisabled = ({ activeStartDate, date, view }) => {
    return date < new Date().setHours(0, 0, 0, 0);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Reservas</h1>
      </div>
      <div className={styles.subcontainer}>
        <Calendar tileDisabled={tileDisabled} onChange={onChange} value={date} />
        <div className="text-center">
          Selected date: {date?.toDateString()}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/hour'>
            <Button ref={hourRef}>
            Siguiente
            </Button>
        </Link>
        <Link href='/login'>
            <Button ref={buttonRef}>
            Atrás
            </Button>
        </Link>
      </div>
    </div>
  )
}

export default Appointment;