import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Success from '../../components/Success/Success';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

const Confirmation = () => {
  const [success, setSuccess] = useState(false);
  const { bookingData } = useContext(StoreContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      (async () => {
        try {
            const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': `${userStorage.token}`
                },
                body: JSON.stringify({
                    firstname: bookingData.user.firstname,
                    lastname: "",
                    phone: bookingData.user?.phone || 0,
                    day: bookingData.schedule.day,
                    email: bookingData.user.email,
                    user_id: bookingData.user.user_id,
                    block_time_id: bookingData.schedule.block_time_id,
                    work_day_id: bookingData.schedule.work_day_id,
                    worker_id: bookingData.worker.worker_id,
                    service_id: bookingData.service.service_id,
                    rut: ""
                }),
            });
            const data = await rs.json();
            if (rs.status === 201) {
                setSuccess(!success);
            } else {
              console.log(data);
            }
        } catch (e) {
            console.log('error', e);
        }
      })();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Confirmación</h1>
      </div>
        <div className={styles.subcontainer}>
          {!success ? <>
            <Card key={bookingData.service.name} service={bookingData.service} />
            <Card key={bookingData.worker.name} service={bookingData.worker} />
            <Card key={bookingData.schedule.id} service={bookingData.schedule} />
          </> : <Success />}
        </div>
        <div className={styles.btnContainer}>
          {!success ?           
            <>
              <Button onClick={handleClick}>
                  Agendar
              </Button> 
              <Link href='/worker'>
                <Button>
                  Atrás
                </Button>
              </Link>
            </>
            : 
              <>
                <Link href='/login'>
                  <Button>
                    Inicio
                  </Button>
                </Link>
                <Button>
                  Mi agenda
                </Button>
              </>
          }
        </div>
    </div>
  );
}

export default Confirmation;