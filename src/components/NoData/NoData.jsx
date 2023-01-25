import React from 'react';
import styles from './nodata.module.css';

function NoData() {
  return (
    <div className={styles.container}>
      <p>Lo sentimos, no hemos encontrado lo que estabas buscando.</p>
    </div>
  );
}

export default NoData;
