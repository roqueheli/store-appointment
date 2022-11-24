import React from 'react';
import styles from './styles.module.css';

function Avatar({ src, alt, text, withText }) {
  return (
    <div className={styles.avatarContainer}>
      <img className={styles.avatar} src={src} alt={alt} />
      {withText && <strong>{text || alt}</strong>}
    </div>
  );
}

export default Avatar;
