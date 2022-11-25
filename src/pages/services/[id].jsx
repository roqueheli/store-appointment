import React, { useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';

function ServiceDetail() {
  const backRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>ServiceDetail</div>
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

export default ServiceDetail;
