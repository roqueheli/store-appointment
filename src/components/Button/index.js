import React, { forwardRef } from 'react';
import styles from './styles.module.css';

const Button = forwardRef(({ children, onClick }, ref) => {
  return (
    <button className={styles.btn} onClick={onClick}>
        {children}
    </button>
  );
});

export default Button;
