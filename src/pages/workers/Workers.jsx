import Link from 'next/link';
import React, { memo, useRef } from 'react';
import fadeIn from 'react-animations/lib/fade-in';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const Workers = memo(({ workers }) => {
  const backRef = useRef();
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Barberos</h1>
      </div>
      <div className={styles.subcontainer}>
        {workers?.map((worker) => (
          <Link href={`/workers/${worker.id}`}>
            <Card key={worker.id} service={worker} animationType={fadeIn} />
          </Link>
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={handleBack} ref={backRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
});

Workers.propTypes = {
  workers: PropTypes.node.isRequired,
};

export default Workers;
