import React from 'react';
import styles from './styles.module.scss';

function Loader() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}>
        <div className={styles.ball_grid_beat}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

export default Loader;
