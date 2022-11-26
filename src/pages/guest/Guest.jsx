import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef,
} from 'react';
import Button from '../../components/Button';
import { StoreContext, initialObj } from '../../context/store';
import styles from './styles.module.css';

function Guest() {
  const { bookingData, setBookingData } = useContext(StoreContext);
  const router = useRouter();
  const loginRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    setBookingData(initialObj);
    nameRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData({
      ...bookingData,
      user: {
        firstname: nameRef.current?.value,
        phone: emailRef.current?.value || 0,
        email: phoneRef.current?.value,
        token: '',
      },
    });
    router.push('/service');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Invitado</h1>
      </div>
      <div className={styles.subcontainer}>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Nombre" name="username" ref={nameRef} value={nameRef.current?.value} />
          <input required type="email" placeholder="Email" name="email" ref={emailRef} value={emailRef.current?.value} />
          <input required type="text" placeholder="Celular" name="phone" ref={phoneRef} value={phoneRef.current?.value} />
          <input className={styles.submitbutton} type="submit" value="Agenda invitado" />
        </form>
      </div>
      <div className={styles.btnContainer}>
        <Link href="/login">
          <Button ref={loginRef}>
            Atrás
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Guest;
