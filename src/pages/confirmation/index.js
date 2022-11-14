import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Success from '../../components/success/Success';
import styles from './styles.module.css';

const service = {
    id: '1',
    name: 'Corte + Lavado',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    price: '10.000',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
};

const worker = {
    id: '1',
    name: 'Edgar Zambrano',
    description: 'Aunque podemos copiar estos textos y copiarlos en nuestro código.',
    photoUrl: 'https://instagram.fscl13-1.fna.fbcdn.net/v/t51.2885-15/312915067_134971822383100_3785699069190191760_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fscl13-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=u8YJpi7zTpcAX8P6mcS&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1Nzg2OTMxNzk3ODY0MDQyMw%3D%3D.2-ccb7-5&oh=00_AfClELmqgSQf-IEap4NGoR_JCIRTvHkHsBgIoJpw6w6nbA&oe=636DBA5F&_nc_sid=30a2ef'
};

const appointment = {
    id: '1',
    date: new Date().toString(),
}

const Confirmation = () => {
  const [success, setSuccess] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    setSuccess(!success);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Confirmación</h1>
      </div>
        <div className={styles.subcontainer}>
          {!success ? <>
            <Card key={service.id} service={service} />
            <Card key={worker.id} service={worker} />
            <Card key={appointment.id} service={appointment} />
          </> : <Success />}
        </div>
        <div className={styles.btnContainer}>
          {!success ?           
            <>
              <Button onClick={handleClick}>
                  Agendar
              </Button> 
              <Link href='/worker'>
                <Button>
                  Atrás
                </Button>
              </Link>
            </>
            : 
              <>
                <Link href='/'>
                  <Button>
                    Inicio
                  </Button>
                </Link>
                <Button>
                  Mi agenda
                </Button>
              </>
          }
        </div>
    </div>
  );
}

export default Confirmation;