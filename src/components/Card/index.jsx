import React from 'react';
import PropTypes from 'prop-types';
import handlePrice from '../../utils/helpers';
import styles from './styles.module.scss';

function Card({ service, onClick, selected }) {
  return (
    <button type="button" className={`${styles.content} ${selected && `${styles.selected}`}`} onClick={onClick}>
      <div className={styles.card}>
        <img src="./mrbarber.jpeg" alt={service.name} />
      </div>
      <div className={styles.firstinfo}>
        <div className={styles.profileinfo}>
          <h1>{service?.name || service?.day}</h1>
          {service?.price ? <h3>{`${handlePrice(service.price)}$`}</h3> : ''}
          {service?.date ? <h3>{service?.date}</h3> : <h3>{service?.hour}</h3>}
          <p className={styles.bio}>{service?.description}</p>
          <h5>{service?.instagram}</h5>
        </div>
      </div>
    </button>
  );
}

Card.propTypes = {
  service: PropTypes.node.isRequired,
  onClick: PropTypes.node.isRequired,
  selected: PropTypes.node.isRequired,
};

export default Card;
