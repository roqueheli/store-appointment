import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const services = [
  {
    id: '1',
    name: 'Corte + Lavado',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    price: '10.000',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },  
  {
    id: '2',
    name: 'Corte + Barba',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    price: '10.000',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },
  {
    id: '3',
    name: 'Barba',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    price: '10.000',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },  
  {
    id: '4',
    name: 'Corte infantil',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    price: '10.000',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
  },
];

const Service = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Servicios</h1>
      </div>
      <div className={styles.subcontainer}>
        {services?.map(service => {
          return (
              <Card key={service.id} service={service} />
            ); 
          })
        }
      </div>
      <div className={styles.btnContainer}>
        <Link href='/worker'>
          <Button>
            Siguiente
          </Button>
        </Link>
        <Link href='/hour'>
          <Button>
            Atrás
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Service;