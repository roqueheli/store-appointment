import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import styles from './styles.module.css';

function PasswordReset({ organization }) {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const backRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/reset_password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current?.value,
            organization: organization?.id,
          }),
        });
        if (rs.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            router.push(`/access/${organization?.nid}`);
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
              <input required placeholder="Email" type="text" name="email" ref={emailRef} value={emailRef.current?.value} />
              <input className={styles.submitbutton} type="submit" value="Recuperar contraseña" />
            </form>
          )
          : <Success />}
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={() => router.push(`/access/${organization?.nid}`)} ref={backRef}>Atrás</Button>
      </div>
    </div>
  );
}

PasswordReset.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default PasswordReset;
