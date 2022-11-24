import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdDateRange, MdLogout } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { logout, userStateChange, loginWithGoogle } from '../../firebase/client';
import Button from '../../components/Button';
import { initialObj, StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Login({ setLogin }) {
  const {
    user, setUser, bookingData, setBookingData,
  } = useContext(StoreContext);
  const googleRef = useRef();
  const loginRef = useRef();
  const appointmentRef = useRef();
  const myreservationsRef = useRef();
  const backRef = useRef();
  const logoutRef = useRef();
  const router = useRouter();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginWithGoogle().then(userStateChange(setUser))
      .catch((error) => setUser({ error }));
  };

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
    if (user.user_id === 0) {
      logout();
    } else {
      setUser(null);
    }
    sessionStorage.removeItem('session');
    setBookingData(initialObj);
  };

  const handleClick = () => {
    setLogin(false);
  };

  const handleReservations = (e) => {
    e.preventDefault();
    sessionStorage.setItem('session', JSON.stringify({
      user_id: user?.user_id || null,
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar || '',
      token: user?.token || null,
    }));
    router.push('/myreservations');
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <img className={styles.logostyle} src="./mrbarber.jpeg" alt="logo" />
      </Link>
      <div className={styles.subcontainer}>
        {!user
          ? (
            <>
              <Button ref={googleRef} onClick={handleGoogleLogin}>
                <FcGoogle />
                Login with Google
              </Button>
              <Link href="/access">
                <Button ref={loginRef}>
                  Login / Registro
                </Button>
              </Link>
              <Button ref={backRef} onClick={handleClick}>
                Atrás
              </Button>
            </>
          )
          : (
            <>
              <Link href="/profile">
                <div className={styles.avatarContainer}>
                  {user.avatar !== ''
                    ? <img className={styles.avatar} src={user.avatar} alt={user.username} />
                    : (
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
              <Button ref={logoutRef} onClick={handleLogout}>
                <MdLogout />
                Logout
              </Button>
            </>
          )}
      </div>
    </div>
  );
}

Login.propTypes = {
  setLogin: PropTypes.node.isRequired,
};

function Home() {
  const {
    user, setUser, bookingData, setBookingData,
  } = useContext(StoreContext);
  const [login, setLogin] = useState(false);
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
          user_id: userStorage.user_id,
          firstname: userStorage.username,
          phone: userStorage?.phone || 0,
          email: userStorage.email,
          token: userStorage?.token,
        },
      });
    } else {
      userStateChange(setUser);
      if (user) {
        setLogin(true);
        setBookingData({
          ...bookingData,
          user: {
            user_id: null,
            firstname: user.username,
            email: user.email,
          },
        });
      }
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
            <Button ref={loginRef} onClick={handleClick}>
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
