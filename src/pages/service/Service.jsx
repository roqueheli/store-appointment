import { useRouter } from 'next/router';
import React, {
  memo,
  useContext, useRef, useState,
} from 'react';
import fadeIn from 'react-animations/lib/fade-in';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

const Service = memo(({ services }) => {
  const [selected, setSelected] = useState('');
  const {
    bookingData, setBookingData,
  } = useContext(StoreContext);
  const router = useRouter();
  const backRef = useRef();
  const nextRef = useRef();

  const handleClick = (service) => {
    setSelected(service);
    setBookingData({
      ...bookingData,
      service: {
        service_id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
      },
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    setBookingData({
      ...bookingData,
      reservation: {
        id: 0,
      },
    });
    router.push(`/login/${router.query?.nid}`);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selected) router.push(`/worker/${router.query?.nid}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Servicios</h1>
      </div>
      <div className={styles.subcontainer}>
        {services?.map((service) => {
          if (service === selected) {
            return (
              <Card
                key={service.id}
                service={service}
                onClick={() => handleClick(service)}
                selected={selected}
                animationType={fadeIn}
              />
            );
          }
          return (
            <Card
              key={service.id}
              service={service}
              onClick={() => handleClick(service)}
              animationType={fadeIn}
            />
          );
        })}
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={handleNext} ref={nextRef}>
          Siguiente
        </Button>
        <Button onClick={handleBack} ref={backRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
});

Service.propTypes = {
  services: PropTypes.node.isRequired,
};

export default Service;
