import React from 'react';
import styles from './styles.module.scss';

const Card = ({ service, onClick, active }) => {
  return (
      <div className={`${styles.content} ` + (active ? `${styles.selected}` : '')} onClick={onClick}>
          <div className={styles.card}>
              <img src='./mrbarber.jpeg' alt={service.name} />
          </div>
          <div className={styles.firstinfo}>
              <div className={styles.profileinfo}>                    
                  <h1>{service?.name}</h1>
                  {service?.price ? <h3>{service.price}$</h3> : service?.date && <h3>{service.date}</h3>}
                  <p className={styles.bio}>{service?.description}</p>
              </div>
          </div>
      </div>
  );
}

export default Card;