import React, { memo, useRef } from 'react';
import Link from 'next/link';
import fadeIn from 'react-animations/lib/fade-in';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData/NoData';

const Services = memo(({ services }) => {
  const backRef = useRef();
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    services
      ? (
        <div className={styles.container}>
          <div className={styles.title_container}>
            <h1 className={styles.title}>Servicios</h1>
          </div>
          <div className={styles.subcontainer}>
            {services.error ? <NoData />
              : services?.map((service) => (
                <Link href={`/servicesdetail/${service.id}`}>
                  <Card key={service.id} service={service} animationType={fadeIn} />
                </Link>
              ))}
          </div>
          <div className={styles.btnContainer}>
            <Button onClick={handleBack} ref={backRef}>
              Atrás
            </Button>
          </div>
        </div>
      )
      : <Loader />
  );
});

Services.propTypes = {
  services: PropTypes.node.isRequired,
};

export default Services;
