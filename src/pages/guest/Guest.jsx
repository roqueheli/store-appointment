import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { StoreContext, initialObj } from '../../context/store';
import styles from './styles.module.css';

function Guest({ organization }) {
  const { bookingData, setBookingData } = useContext(StoreContext);
  const router = useRouter();
  const loginRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    setBookingData(initialObj);
    nameRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData({
      ...bookingData,
      organization: {
        id: organization?.id,
        name: organization?.name,
        nid: organization?.nid,
        uri_web: organization?.uri_web,
        logo: organization?.logo,
      },
      user: {
        user_id: null,
        firstname: nameRef.current?.value,
        email: emailRef.current?.value || 0,
        phone: phoneRef.current?.value,
        token: '',
      },
    });
    router.push(`/service/${organization?.nid}`);
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.push(`/homelogin/${organization?.nid}`);
  };

  return (
    organization ? (
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Invitado</h1>
        </div>
        <div className={styles.subcontainer}>
          <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="Nombre" name="username" ref={nameRef} value={nameRef.current?.value} />
            <input required type="email" placeholder="Email" name="email" ref={emailRef} value={emailRef.current?.value} />
            <input required type="text" placeholder="Celular" name="phone" ref={phoneRef} value={phoneRef.current?.value} />
            <input className={styles.submitbutton} type="submit" value="Agenda invitado" />
          </form>
        </div>
        <div className={styles.btnContainer}>
          <Button onClick={handleBack} ref={loginRef}>
            Atrás
          </Button>
        </div>
      </div>
    ) : ''
  );
}

Guest.propTypes = {
  organization: PropTypes.node.isRequired,
};

export default Guest;
