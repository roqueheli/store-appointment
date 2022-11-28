import React, {
  useContext, useRef, useState, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import Button from '../../components/Button';
import styles from './access.module.css';
import { userStateChange, loginWithGoogle } from '../../firebase/client';
import { StoreContext } from '../../context/store';

function Access() {
  const [loginError, setLoginError] = useState(false);
  const {
    user, setUser, bookingData, setBookingData,
  } = useContext(StoreContext);
  const router = useRouter();
  const accessRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (user) router.push('/login');
    emailRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current?.value, password: passwordRef.current?.value,
          }),
        });
        if (rs.status === 200) {
          const data = await rs.json();
          setUser({
            username: data.username, email: emailRef.current?.value, phone: data?.phone || 0, avatar: '', token: data.token,
          });
          setBookingData({
            ...bookingData,
            user: {
              user_id: data.user_id,
              firstname: data.username,
              phone: data?.phone || 0,
              email: data.email,
              token: data?.token,
            },
          });
          sessionStorage.setItem('session', JSON.stringify({
            user_id: data?.user_id || null, username: data?.username, email: emailRef.current?.value, phone: data?.phone || 0, avatar: '', token: data?.token || null,
          }));
          router.push('/login');
        } else {
          setLoginError(true);
        }
      } catch (error) {
        setUser({ error });
      }
    })();
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginWithGoogle().then(userStateChange(setUser))
      .then(sessionStorage.setItem('session', JSON.stringify(
        {
          user_id: user?.user_id || null, username: user?.username, email: user?.email, avatar: user?.avatar || '', token: user?.token || null,
        },
      )))
      .catch((error) => setUser({ error }));
    router.push('/login');
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.push('/homelogin');
  };

  return (
    !user ? (
      <div className={styles.access_container}>
        <div className={styles.access_title_container}>
          <h1 className={styles.access_title}>Acceso</h1>
        </div>
        <div className={styles.access_subcontainer}>
          <form onSubmit={handleSubmit}>
            <input required type="email" placeholder="Email" name="email" ref={emailRef} value={emailRef.current?.value} />
            <input required type="password" placeholder="Password" name="password" ref={passwordRef} value={passwordRef.current?.value} autoComplete="off" />
            <input className={styles.access_submitbutton} type="submit" value="Iniciar sesión" />
            <button onClick={handleGoogleLogin} className={styles.access_loginGoogle} type="button">
              <FcGoogle />
              Login con Google
            </button>
            <div className={styles.access_othertexts}>
              <a href="/register">Registrarse</a>
              <a href="/passwordreset">¿Olvidó su contraseña?</a>
            </div>
          </form>
          {loginError ? (
            <h4 className={styles.access_loginerrormsg}>
              Email o contraseña
              <span className={styles.access_errormsgsecondline}>inválido</span>
            </h4>
          ) : <p />}
        </div>
        <div className={styles.access_btnContainer}>
          <Button onClick={handleBack} ref={accessRef}>
            Atrás
          </Button>
        </div>
      </div>
    )
      : ''
  );
}

export default Access;
