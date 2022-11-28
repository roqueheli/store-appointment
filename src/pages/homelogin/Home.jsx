import React, {
  useContext, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import { MdDateRange } from 'react-icons/md';
import Button from '../../components/Button';
import { initialObj, StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Home() {
  const {
    setUser, bookingData, setBookingData,
  } = useContext(StoreContext);
  const loginRef = useRef();
  const guestRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    setBookingData(initialObj);
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      setUser(userStorage);
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

  return (
    <div className={styles.container}>
      <Link href="/">
        <img className={styles.logostyle} src="./mrbarber.jpeg" alt="logo" />
      </Link>
      <div className={styles.subcontainer}>
        <Link href="/access">
          <Button ref={loginRef}>
            Login
          </Button>
        </Link>
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
  );
}

export default Home;
