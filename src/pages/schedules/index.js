import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

const Schedules = ({ schedules }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Horarios</h1>
      </div>
      <div className={styles.subcontainer}>
        {schedules?.map(schedule => {
          return (
              <Link href={`/services/${schedules.id}`}>
                <Card key={schedules.id} schedules={schedules} />
              </Link>
            ); 
          })
        }
        {!schedules ? <p>No existen resultados</p> : ''}
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

Schedules.getInitialProps = async (ctx) => {
  const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}schedules`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(rs);
  const json = await rs.json()
  return { schedules: json.stargazers_count }
}

export default Schedules;