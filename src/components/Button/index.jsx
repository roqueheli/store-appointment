import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = forwardRef(({ children, onClick }, ref) => <button type="button" ref={ref} className={styles.btn} onClick={onClick}>{children}</button>);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.node.isRequired,
};

export default Button;
