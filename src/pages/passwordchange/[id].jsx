import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import styles from './styles.module.css';

const initialObj = {
  newpass: '',
  confirm: '',
};

function PasswordChange() {
  const [newValues, setNewValues] = useState(initialObj);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdate = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${router.query.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: userStorage.token },
          body: JSON.stringify({
            password: newValues.newpass, password_confirmation: newValues.confirm,
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

  const handleNewValue = (e) => {
    setNewValues({
      ...newValues,
      [e.target.name]: e.target.value,
    });
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
              <input required placeholder="Nueva contraseña" type="password" name="newpass" onChange={handleNewValue} value={newValues.newpass} />
              <input required placeholder="Confirmar contraseña" type="password" name="confirm" onChange={handleNewValue} value={newValues.confirm} />
              <input className={styles.submitbutton} type="submit" value="Cambiar contraseña" />
            </form>
          )
          : <Success />}
      </div>
      <div className={styles.btnContainer}>
        <Link href="/profile">
          <Button>Atrás</Button>
        </Link>
      </div>
    </div>
  );
}

export default PasswordChange;
