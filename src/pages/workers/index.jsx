import Link from 'next/link';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

function Workers({ workers }) {
  const backRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Barberos</h1>
      </div>
      <div className={styles.subcontainer}>
        {workers?.map((worker) => (
          <Link href={`/workers/${worker.id}`}>
            <Card key={worker.id} service={worker} />
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

Workers.getInitialProps = async () => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { workers: data };
};

Workers.propTypes = {
  workers: PropTypes.node.isRequired,
};

export default Workers;
