import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const Workers = ({ workers }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>      
        <h1 className={styles.title}>Barberos</h1>
      </div>
      <div className={styles.subcontainer}>
        {workers?.map(worker => {
          return (
              <Link href={`/workers/${worker.id}`}>
                <Card key={worker.id} service={worker} />
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

Workers.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}workers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(rs);
  const json = await rs.json()
  return { workers: json.stargazers_count }
}

export default Workers;