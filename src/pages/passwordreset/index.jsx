import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import styles from './styles.module.css';

const initialObj = {
  email: '',
  temporal: '',
  newpass: '',
  confirm: '',
};

function PasswordReset() {
  const [newValues, setNewValues] = useState(initialObj);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdate = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/reset_password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newValues.email }),
        });
        if (rs.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/access');
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
              <input required placeholder="Email" type="text" name="email" onChange={handleNewValue} value={newValues.email} />
              <input className={styles.submitbutton} type="submit" value="Recuperar contraseña" />
            </form>
          )
          : <Success />}
      </div>
      <div className={styles.btnContainer}>
        <Link href="/access">
          <Button>Atrás</Button>
        </Link>
      </div>
    </div>
  );
}

export default PasswordReset;
