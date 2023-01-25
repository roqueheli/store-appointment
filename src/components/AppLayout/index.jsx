import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>Mr. Barber | cut & shave | Since 2022</title>
        <meta name="description" content="store-appointment" />
        <link rel="icon" href="/mrbarber.jpeg" />
      </Head>
      <div className={styles.groupDiv}>
        <section className={styles.main}>
          {children}
        </section>
      </div>
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
