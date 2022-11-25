import React, { useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import styles from './styles.module.css';

function ServiceDetail({ service }) {
  const backRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Servicio</h1>
      </div>
      <div className={styles.subcontainer}>
        <h5>{service?.description}</h5>
      </div>
      <div className={styles.btnContainer}>
        <Link href="/services">
          <Button ref={backRef}>
            Atras
          </Button>
        </Link>
      </div>
    </div>
  );
}

ServiceDetail.propTypes = {
  service: PropTypes.node.isRequired,
};

export default ServiceDetail;
