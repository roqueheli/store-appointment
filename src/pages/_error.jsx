import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styles.module.css';
import errors from '../utils/errors';

function Error({ statusCode }) {
  const customError = errors.find((error) => error.code === statusCode);
  return (
    <div className={styles.container}>
      {customError
        ? (
          <div className={styles.subcontainer}>
            <div className={styles.title_container}>
              <h1>{customError.code ? customError.code : '404'}</h1>
            </div>
            <h2>{customError.title ? customError.title : '¡Página no encontrada!'}</h2>
            <p>{customError.description ? customError.description : 'Lo sentimos, no hemos encontrado lo que estabas buscando.'}</p>
            <div className={styles.btnContainer} />
          </div>
        )
        : ''}
    </div>
  );
}

Error.propTypes = {
  statusCode: PropTypes.node.isRequired,
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res.statusCode || err.statusCode || 404;
  return { statusCode };
};

export default Error;
