import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Button from '../../components/Button';
import styles from './styles.module.css';
import { StoreContext } from '../../context/store';

const initialObject = {
    email: '',
    password: '',
}

const Access = () => {
    const [loginData, setLoginData] = useState(initialObject);
    const [loginError, setLoginError] = useState(false);
    const { setUser, bookingData, setBookingData } = useContext(StoreContext);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        (async () => {
            try {
                const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: loginData.email, password: loginData.password }),
                });
                if (rs.status === 200) {
                    const data = await rs.json();
                    setUser({ username: data.username, email: loginData.email, phone: data?.phone || 0, avatar: '', token: data.token });
                    setBookingData({
                        ...bookingData,
                        'user': {
                            'user_id': data.user_id,
                            'firstname': data.username,
                            'phone': data?.phone || 0,
                            'email': data.email,
                            'token': data?.token
                        }
                    });
                    sessionStorage.setItem('session', JSON.stringify({ user_id: data?.user_id || null, username: data?.username, email: loginData?.email, phone: data?.phone || 0, avatar: '', token: data?.token || null }));
                    router.push('/login');
                } else {
                    setLoginError(true);
                }
            } catch (e) {
                console.log('error', e);
            }
        })();
    };
    
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Acceso</h1>
            </div>
            <div className={styles.subcontainer}>
                <form onSubmit={handleSubmit}>
                    <input required type='email' placeholder='Email' name='email' onChange={handleChange} value={loginData.email} />
                    <input required type='password' placeholder='Password' name='password' onChange={handleChange} value={loginData.password} autoComplete='off' />
                    <input className={styles.submitbutton} type='submit' value='Iniciar sesión' />
                    <div className={styles.othertexts}>                        
                        <a href='/register'>Registrarse</a>
                        <a href='/passwordreset'>¿Olvidó su contraseña?</a>
                    </div>
                </form>
                {loginError ? <h4 className={styles.loginerrormsg}>Email o contraseña <span className={styles.errormsgsecondline}>inválido</span></h4> : <p></p>}
            </div>
            <div className={styles.btnContainer}>
                <Link href='/login'>
                    <Button>
                        Atrás
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Access;
