import React from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';

function ServiceDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>ServiceDetail</div>
      <div className={styles.btnContainer}>
        <Link href="/services">
          <Button>
            Atras
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ServiceDetail;
