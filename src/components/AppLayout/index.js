import Head from 'next/head';
import styles from './styles.module.css';

function AppLayout ({ children }) {
  return (
    <>
      <Head>
        <title>Mr. Barber | cut & shave | Since 2022</title>
        <meta name='description' content='Devtter' />
        <link rel='icon' href='/mrbarber.jpeg' />
      </Head>
      <div className={styles.groupDiv}>
          <section className={styles.main}>
            {children}
          </section>
      </div>
    </>
  );
};

export default AppLayout;
