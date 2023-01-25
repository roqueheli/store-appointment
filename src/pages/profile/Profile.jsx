import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

function Profile({ organization }) {
  const [userStorage, setUserStorage] = useState();
  const backRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const userStoraged = JSON.parse(sessionStorage.getItem('session'));
    setUserStorage(userStoraged);
  }, []);

  const userId = userStorage?.user_id || 0;
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Perfil</h1>
      </div>
      <div className={styles.subcontainer}>
        {userId > 0
          ? (
            <>
              <div className={styles.profilecard}>
                <Link href={`${organization.nid}/${userId}`}>
                  <h1>Perfil</h1>
                </Link>
              </div>
              <div className={styles.profilecard}>
                <Link href={`/passwordchange/${organization.nid}`}>
                  <h1>Cambiar contraseña</h1>
                </Link>
              </div>
            </>
          )
          : ''}
        <div className={styles.profilecard}>
          <Link href={`/myreservations/${organization?.nid}`}>
            <h1>Mis Reservas</h1>
          </Link>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={() => router.push(`/login/${organization?.nid}`)} ref={backRef}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default Profile;
