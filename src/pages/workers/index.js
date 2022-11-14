import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const workers = [
  {
    id: '1',
    name: 'Edgar Zambrano',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },  
  {
    id: '2',
    name: 'Edgar Zambrano',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },
  {
    id: '3',
    name: 'Edgar Zambrano',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },  
  // {
  //   id: '4',
  //   name: 'Edgar Zambrano',
  //   description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
  //   photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  // },
];

const Workers = () => {
  const { pathname } = useRouter();

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

export default Workers;