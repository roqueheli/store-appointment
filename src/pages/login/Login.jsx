import React, { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MdDateRange, MdLogout } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { logout } from '../../firebase/client';
import Button from '../../components/Button';
import { initialObj, StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Login() {
  const {
    user, setUser, bookingData, setBookingData,
  } = useContext(StoreContext);
  const appointmentRef = useRef();
  const myreservationsRef = useRef();
  const logoutRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/access');
  }, []);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      user: {
        user_id: user?.user_id || '',
        firstname: user?.username,
        phone: user?.phone || 0,
        email: user?.email,
        token: user?.token || '',
      },
    });
  }, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setUser(null);
    sessionStorage.removeItem('session');
    setBookingData(initialObj);
    router.push('/access');
  };

  const handleReservations = (e) => {
    e.preventDefault();
    sessionStorage.setItem(
      'session',
      JSON.stringify({
        user_id: user?.user_id || null,
        username: user?.username,
        email: user?.email,
        avatar: user?.avatar || '',
        token: user?.token || null,
      }),
    );
    router.push('/myreservations');
  };

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        {user ? (
          <>
            <Link href="/">
              <img
                className={styles.logostyle}
                src="./mrbarber.jpeg"
                alt="logo"
              />
            </Link>
            <Link href="/profile">
              <div className={styles.avatarContainer}>
                {user.avatar !== '' ? (
                  <img
                    className={styles.avatar}
                    src={user.avatar}
                    alt={user.username}
                  />
                ) : (
                  <span className={styles.noavatar}>
                    {user.username.toUpperCase().slice(0, 1)}
                  </span>
                )}
                <strong>{`${user.username[0].toUpperCase()}${user.username.substring(1)}`}</strong>
              </div>
            </Link>
            <Link href="/service">
              <Button ref={appointmentRef}>
                <MdDateRange />
                Reserva ahora
              </Button>
            </Link>
            <Button onClick={handleReservations} ref={myreservationsRef}>
              <BsCalendarDate />
              Mis reservas
            </Button>
            <Button onClick={handleLogout} ref={logoutRef}>
              <MdLogout />
              Logout
            </Button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Login;
