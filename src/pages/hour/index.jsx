import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Button from '../../components/Button';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Hour() {
  const [selected, setSelected] = useState('');
  const { bookingData, setBookingData } = useContext(StoreContext);
  const [hours, setHours] = useState([]);
  const buttonRef = useRef();
  const serviceRef = useRef();
  const router = useRouter();

  const handleClick = (blocktime) => {
    setSelected(blocktime);
    setBookingData({
      ...bookingData,
      schedule: {
        ...bookingData.schedule,
        work_day_id: hours.work_day.id,
        block_time_id: blocktime.id,
        hour: blocktime.start.substring(11, 19),
      },
    });
  };

  useEffect(() => {
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers/available_hours`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userStorage?.token || ''}`,
          },
          body: JSON.stringify({ id: bookingData.worker.worker_id, day: bookingData.schedule.day }),
        });
        const data = await rs.json();
        if (rs.status === 200) {
          setHours(data);
        }
      } catch (error) {
        setHours({ error: 'Ha ocurrido un error' });
      }
    })();
  }, []);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (selected) router.push('/confirmation');
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.push('/appointment');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Hora</h1>
      </div>
      <div className={styles.subcontainer}>
        <ul>
          {hours?.block_times?.map((hour) => {
            if (hour === selected) {
              return (
                <li
                  key={hour.id}
                  className={selected ? styles.liactive : ''}
                >
                  <button type="button" onClick={() => handleClick(hour)}>{hour.start.substring(11, 19)}</button>
                </li>
              );
            }
            return (
              <li
                key={hour.id}
                className={styles.linormal}
              >
                <button type="button" onClick={() => handleClick(hour)}>{hour.start.substring(11, 19)}</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={handleConfirm} ref={serviceRef}>
          Confirmar
        </Button>
        <Button onClick={handleBack} ref={buttonRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

export default Hour;
