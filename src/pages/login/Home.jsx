import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Link from 'next/link';
import { MdDateRange } from 'react-icons/md';
import Button from '../../components/Button';
import { initialObj, StoreContext } from '../../context/store';
import styles from './styles.module.css';
import Login from './Login';

function Home() {
  const {
    setUser, bookingData, setBookingData, login, setLogin
  } = useContext(StoreContext);
  const loginRef = useRef();
  const guestRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    setBookingData(initialObj);
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      setUser(userStorage);
      setLogin(true);
      setBookingData({
        ...bookingData,
        user: {
          user_id: userStorage.user_id || null,
          firstname: userStorage.username,
          phone: userStorage?.phone || 0,
          email: userStorage.email,
          token: userStorage?.token,
        },
      });
    }
  }, []);

  const handleClick = () => {
    setLogin(true);
  };

  return (
    !login
      ? (
        <div className={styles.container}>
          <Link href="/">
            <img className={styles.logostyle} src="./mrbarber.jpeg" alt="logo" />
          </Link>
          <div className={styles.subcontainer}>
            <Button onClick={handleClick} ref={loginRef}>
              Login
            </Button>
            <Link href="/guest">
              <Button ref={guestRef}>
                <MdDateRange />
                Reserva invitado
              </Button>
            </Link>
            <Link href="/">
              <Button ref={backRef}>
                Atrás
              </Button>
            </Link>
          </div>
        </div>
      )
      : <Login setLogin={setLogin} />
  );
}

export default Home;
