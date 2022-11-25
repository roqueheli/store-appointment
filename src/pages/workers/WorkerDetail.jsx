import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';

function WorkerDetail({ worker }) {
  const backRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Barbero</h1>
      </div>
      <div className={styles.subcontainer}>
        <h5>{worker?.description}</h5>
      </div>
      <div className={styles.btnContainer}>
        <Link href="/workers">
          <Button ref={backRef}>
            Atras
          </Button>
        </Link>
      </div>
    </div>
  );
}

WorkerDetail.propTypes = {
  worker: PropTypes.node.isRequired,
};

export default WorkerDetail;
