import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const Services = ({ services }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Servicios</h1>
      </div>
      <div className={styles.subcontainer}>
        {services?.map(service => {
          return (
              <Link href={`/services/${service.id}`}>
                <Card key={service.id} service={service} />
              </Link>
            ); 
          })
        }
      </div>
      <div className={styles.btnContainer}>
        <Link href='/'>
          <Button>
            Atrás
          </Button>
        </Link>
      </div>
    </div>
  );
}

Services.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}services`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await rs.json()
  return { services: json.stargazers_count }
}

export default Services;