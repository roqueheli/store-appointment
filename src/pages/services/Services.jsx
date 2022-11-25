import React, { useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

function Services({ services }) {
  const backRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Servicios</h1>
      </div>
      <div className={styles.subcontainer}>
        {services?.map((service) => (
          <Link href={`/services/${service.id}`}>
            <Card key={service.id} service={service} />
          </Link>
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Link href="/">
          <Button ref={backRef}>
            Atrás
          </Button>
        </Link>
      </div>
    </div>
  );
}

Services.propTypes = {
  services: PropTypes.node.isRequired,
};

export default Services;
