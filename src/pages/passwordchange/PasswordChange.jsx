import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { StoreContext } from '../../context/store';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import styles from './styles.module.css';

function PasswordChange({ organization }) {
  const { bookingData } = useContext(StoreContext);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const backRef = useRef();
  const newPassRef = useRef();
  const confirmRef = useRef();

  useEffect(() => {
    newPassRef.current?.focus();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${bookingData.user.user_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: userStorage.token },
          body: JSON.stringify({
            password: newPassRef.current?.value, password_confirmation: confirmRef.current?.value,
          }),
        });
        if (rs.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            router.push(`/profile/${organization?.nid}`);
          }, 3000);
        } else {
          setSuccess(false);
        }
      } catch {
        setSuccess(false);
      }
    })();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Contraseña</h1>
      </div>
      <div className={styles.subcontainer}>
        {!success
          ? (
            <form onSubmit={handleUpdate}>
              <input required placeholder="Nueva contraseña" type="password" name="newpass" ref={newPassRef} value={newPassRef.current?.value} />
              <input required placeholder="Confirmar contraseña" type="password" name="confirm" ref={confirmRef} value={confirmRef.current?.value} />
              <input className={styles.submitbutton} type="submit" value="Cambiar contraseña" />
            </form>
          )
          : <Success />}
      </div>
      <div className={styles.btnContainer}>
        <Link href={`/profile/${organization?.nid}`}>
          <Button ref={backRef}>Atrás</Button>
        </Link>
      </div>
    </div>
  );
}

PasswordChange.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default PasswordChange;
