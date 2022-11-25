import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
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

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Barberos</h1>
      </div>
      <div className={styles.subcontainer}>
        {workers?.map((worker) => {
          if (worker === selected) {
            return (
              <Card key={worker.id} service={worker} onClick={() => handleClick(worker)} active />
            );
          }
          return (
            <Card key={worker.id} service={worker} onClick={() => handleClick(worker)} />
          );
        })}
      </div>
      <div className={styles.btnContainer}>
        <Link href="/appointment">
          <Button ref={selectDateRef}>
            Seleccion fecha
          </Button>
        </Link>
        <Link href="/service">
          <Button ref={backRef}>
            Atrás
          </Button>
        </Link>
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
