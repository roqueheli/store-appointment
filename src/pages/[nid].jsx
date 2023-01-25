import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import styles from '../styles/styles.module.css';

export default function Home({ organization }) {
  const workersRef = useRef();
  const entersRef = useRef();
  const servicesRef = useRef();
  const schedulesRef = useRef();
  const router = useRouter();

  const handleServices = (e) => {
    e.preventDefault();
    router.push(`/services/${organization?.nid}`);
  };
  const handleWorkers = (e) => {
    e.preventDefault();
    router.push(`/workers/${organization?.nid}`);
  };
  const handleSchedules = (e) => {
    e.preventDefault();
    router.push(`/schedules/${organization?.nid}`);
  };
  const handleHomeLogin = (e) => {
    e.preventDefault();
    router.push(`/homelogin/${organization?.nid}`);
  };

  return (
    <div className={styles.container}>
      <Link href={`/${organization?.nid}`}>
        <img className={styles.logostyle} src={organization?.logo} alt={organization?.name} />
      </Link>
      <div className={styles.subcontainer}>
        <Button onClick={handleServices} ref={servicesRef}>
          Servicios
        </Button>
        <Button onClick={handleWorkers} ref={workersRef}>
          Barberos
        </Button>
        <Button onClick={handleSchedules} ref={schedulesRef}>
          Horarios
        </Button>
        <Button onClick={handleHomeLogin} ref={entersRef}>
          Entrar
        </Button>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}organizations`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await rs.json();
    const paths = data.map(({ nid }) => ({ params: { nid: `${nid}` } }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return { statusCode: 404 };
  }
}

export async function getStaticProps({ params }) {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}organizations/${params.nid}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const organization = await rs.json();
  return { props: { organization } };
}

Home.propTypes = {
  organization: PropTypes.node.isRequired,
};
