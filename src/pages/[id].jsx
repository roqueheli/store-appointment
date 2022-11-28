import React, { useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import styles from '../styles/styles.module.css';
import { StoreContext } from '../context/store';

function Home({ organization }) {
  const { bookingData, setBookingData } = useContext(StoreContext);
  const workersRef = useRef();
  const servicesRef = useRef();
  const schedulesRef = useRef();

  useEffect(() => {
    setBookingData({
      ...bookingData,
      organization: {
        id: organization?.organization_id,
        name: organization?.name,
        nid: organization?.nid,
        uri_web: organization?.uri_web,
        logo: organization?.logo,
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/">
        <img className={styles.logostyle} src="./mrbarber.jpeg" alt="logo" />
      </Link>
      <div className={styles.subcontainer}>
        <Link href="/services">
          <Button ref={servicesRef}>
            Servicios
          </Button>
        </Link>
        <Link href="/workers">
          <Button ref={workersRef}>
            Barberos
          </Button>
        </Link>
        <Link href="/schedules">
          <Button ref={schedulesRef}>
            Horarios
          </Button>
        </Link>
        <Link href="/homelogin">
          <Button>
            Entrar
          </Button>
        </Link>
      </div>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}organizations/${ctx.query.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await rs.json();
  return { organization: data };
};

Home.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default Home;
