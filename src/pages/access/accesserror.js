import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

const AccessError = ({ setLoginError }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setLoginError(false);
  }

  return (
    <>
      <div className={styles.subcontainer}>            
      </div>
      <div className={styles.btnContainer}>
          <Link href='/access'>
              <Button onClick={handleClick}>
                  OK
              </Button>
          </Link>
      </div>
    </>
  )
}

export default AccessError;