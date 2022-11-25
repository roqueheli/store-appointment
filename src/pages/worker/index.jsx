import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Worker({ workers }) {
  const [selected, setSelected] = useState('');
  const { bookingData, setBookingData } = useContext(StoreContext);
  const selectDateRef = useRef();
  const backRef = useRef();
  const router = useRouter();

  const handleClick = (worker) => {
    setSelected(worker);
    setBookingData({
      ...bookingData,
      worker: {
        worker_id: worker.id,
        name: worker?.name,
        instagram: worker?.instagram,
        image_url: worker?.image_url,
        description: worker.description,
      },
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.push('/service');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selected) router.push('/appointment');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Barberos</h1>
      </div>
      <div className={styles.subcontainer}>
        {workers?.map((worker) => {
          if (worker === selected) {
            return (
              <Card
                key={worker.id}
                service={worker}
                onClick={() => handleClick(worker)}
                selected={selected}
              />
            );
          }
          return (
            <Card key={worker.id} service={worker} onClick={() => handleClick(worker)} />
          );
        })}
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={handleNext} ref={selectDateRef}>
          Siguiente
        </Button>
        <Button onClick={handleBack} ref={backRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

Worker.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { workers: data };
};

Worker.propTypes = {
  workers: PropTypes.node.isRequired,
};

export default Worker;
