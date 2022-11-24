import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import { StoreContext } from '../../context/store';

const Appointment = () => {
  const {bookingData, setBookingData} = useContext(StoreContext);
  const buttonRef = useRef();
  const hourRef = useRef();
  const [date, setDate] = useState(null);

  const tileDisabled = ({ activeStartDate, date, view }) => {
    return new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  }

  const handleChange = (date) => {
    setDate(date);
    setBookingData({
      ...bookingData,
      'schedule': {
        'day': new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString().slice(0,10).replace(/-/g,''),
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Fechas</h1>
      </div>
      <div className={styles.subcontainer}>
        <Calendar tileDisabled={tileDisabled} onChange={handleChange} value={date} />
        <div className='text-center'>
          Selected date: {date?.toDateString()}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/hour'>
            <Button ref={hourRef}>
            Siguiente
            </Button>
        </Link>
        <Link href='/worker'>
            <Button ref={buttonRef}>
            Atrás
            </Button>
        </Link>
      </div>
    </div>
  )
}

export default Appointment;
