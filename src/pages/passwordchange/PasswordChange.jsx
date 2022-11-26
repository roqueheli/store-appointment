import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import styles from './styles.module.css';

function PasswordChange() {
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
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${router.query.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: userStorage.token },
          body: JSON.stringify({
            password: newPassRef.current?.value, password_confirmation: confirmRef.current?.value,
          }),
        });
        if (rs.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/profile');
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
        <Link href="/profile">
          <Button ref={backRef}>Atrás</Button>
        </Link>
      </div>
    </div>
  );
}

export default PasswordChange;
