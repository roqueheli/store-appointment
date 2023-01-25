import React, {
  useContext, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { MdDateRange } from 'react-icons/md';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { initialObj, StoreContext } from '../../context/store';
import styles from './styles.module.css';

function Home({ organization }) {
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
        organization: {
          id: organization?.id,
          name: organization?.name,
          nid: organization?.nid,
          uri_web: organization?.uri_web,
          logo: organization?.logo,
        },
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
    organization
      ? (
        <div className={styles.container}>
          <Link href={`/${organization.nid}`}>
            <img
              className={styles.logostyle}
              src={organization?.logo}
              alt={organization?.nid}
            />
          </Link>
          <div className={styles.subcontainer}>
            <Link href={`/access/${organization.nid}`}>
              <Button ref={loginRef}>
                Login
              </Button>
            </Link>
            <Link href={`/guest/${organization.nid}`}>
              <Button ref={guestRef}>
                <MdDateRange />
                Reserva invitado
              </Button>
            </Link>
            <Link href={`/${organization.nid}`}>
              <Button ref={backRef}>
                Atrás
              </Button>
            </Link>
          </div>
        </div>
      )
      : <Loader />
  );
}

Home.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default Home;
