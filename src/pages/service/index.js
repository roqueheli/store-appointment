import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

const Service = ({ services }) => {
  const [selected, setSelected] = useState("");
  const { bookingData, setBookingData } = useContext(StoreContext);

  const handleClick = (service) => {
    setSelected(service);
    setBookingData({
      ...bookingData,
      "service": {
        "service_id": service.id,
        "name": service.name,
        "description": service.description,
        "price": service.price
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Servicios</h1>
      </div>
      <div className={styles.subcontainer}>
        {services?.map(service => {
          if (service === selected) {
            return <Card key={service.id} service={service} active onClick={() => handleClick(service)} />;
          } else {
            return <Card key={service.id} service={service} onClick={() => handleClick(service)} />;
          }
        })}
      </div>
      <div className={styles.btnContainer}>
        <Link href='/worker'>
          <Button>
            Siguiente
          </Button>
        </Link>
        <Link href='/login'>
          <Button>
            Atrás
          </Button>
        </Link>
      </div>
    </div>
  );
}

Service.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await rs.json()
  return { services: data }
}

export default Service;