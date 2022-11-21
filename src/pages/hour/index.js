import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../components/Button';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

const Hour = () => {
  const [selected, setSelected] = useState("");
  const { bookingData, setBookingData } = useContext(StoreContext);
  const [hours, setHours] = useState([]);
  const buttonRef = useRef();
  const serviceRef = useRef();

  const handleClick = (blocktime) => {
    setSelected(blocktime);
    setBookingData({
      ...bookingData,
      "schedule": {
        ...bookingData.schedule,
        "work_day_id": hours.work_day.id,
        "block_time_id": blocktime.id,
        "hour": blocktime.start.substring(11,19),
      }
    });
  }

  useEffect(() => {
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      (async () => {
        try {
            const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers/available_hours`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': `${userStorage.token}`
                },
                body: JSON.stringify({ id: bookingData.worker.worker_id, day: bookingData.schedule.day }),
            });
            if (rs.status === 200) {
                const data = await rs.json();
                setHours(data);
            }
        } catch (e) {
            console.log('error', e);
        }
      })();
    }
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Hora</h1>
      </div>
      <div className={styles.subcontainer}>
        <ul>
          {hours?.block_times?.map(hour => {
            if (hour === selected) {
              return <li key={hour.id} className={selected ? styles.liactive : ''} onClick={() => handleClick(hour)}>{hour.start.substring(11,19)}</li>
            } else {
              return <li key={hour.id} className={styles.linormal} onClick={() => handleClick(hour)}>{hour.start.substring(11,19)}</li>
            }
          })}
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/confirmation'>
            <Button ref={serviceRef}>
            Confirmar
            </Button>
        </Link>
        <Link href='/appointment'>
            <Button ref={buttonRef}>
            Atrás
            </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hour;