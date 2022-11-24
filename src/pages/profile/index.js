import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

const Profile = () => {
  const [userStorage, setUserStorage] = useState();

  useEffect(() => {
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    setUserStorage(userStorage);
  }, []);

  const user_id = userStorage?.user_id || 0;
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Perfil</h1>
      </div>
      <div className={styles.subcontainer}>
        {user_id > 0 ? 
        <>
          <div className={styles.profilecard}>
            <Link href={`profile/${user_id}`}>
              <h1>Perfil</h1>
            </Link>
          </div>
          <div className={styles.profilecard}>
            <Link href={`passwordchange/${user_id}`}>
              <h1>Cambiar contraseña</h1>
            </Link>
          </div>
        </>
        : ''}
        <div className={styles.profilecard}>
          <Link href={'myreservations'}>
            <h1>Mis Reservas</h1>
          </Link>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/login'>
            <Button>
              Atrás
            </Button>
        </Link>
      </div>
    </div>
  )
}

export default Profile;
