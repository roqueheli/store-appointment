import React, { useRef } from 'react';
import styles from '../styles/styles.module.css';
import Button from '../components/Button';
import Link from 'next/link';

const Home = () => {
  const workersRef = useRef();
  const servicesRef = useRef();
  const schedulesRef = useRef();

  const logostyle = {
      borderRadius: "50%",
      cursor: 'pointer',
      width: '20rem',
  }

  return (
      <div className={styles.container}>
          <Link href='/'>
            <img style={logostyle} src="./mrbarber.jpeg" alt="logo" />
          </Link>
          <div className={styles.subcontainer}>              
            <Link href='/services'>
              <Button ref={servicesRef}>
                Servicios
              </Button>
            </Link>
            <Link href='/workers'>
              <Button ref={workersRef}>
                Barberos
              </Button>
            </Link>
            <Link href='/schedules'>
              <Button ref={schedulesRef}>
                Horarios
              </Button>
            </Link>
            <Link href='/login'>
              <Button>
                Entrar
              </Button>
            </Link>
          </div>
      </div>
  );
}

export default Home;