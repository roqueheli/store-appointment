import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';
import Success from '../../components/Success/Success';
import { useRouter } from 'next/router';

const initialObject = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: ''
}

const Register = () => {
    const [registerData, setRegisterData] = useState(initialObject);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const [registerError, setRegisterError] = useState(false);
    const router = useRouter();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.password_confirmation) {
            setMessage({ first: 'Las contraseñas', second: 'no coinciden'});
            setRegisterError(true);
            return;
        }

        (async () => {
            try {
                const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registerData),
                });
                const data = await rs.json();
                if (rs.status === 201) {
                    setSuccess(true);
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                } else if (rs.status === 422) {
                    setMessage({ first: 'Email', second: 'ya se encuentra registrado'});
                    setRegisterError(true);
                }
            } catch (e) {
                console.log('error', e);
            }
        })();
    };
    
    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Registrarse</h1>
            </div>
            <div className={styles.subcontainer}>
            {!success ?
                <>
                    <form onSubmit={handleSubmit}>
                        <input required type='text' placeholder='Nombre' name='name' onChange={handleChange} value={registerData.name} />
                        <input required type='email' placeholder='Email' name='email' onChange={handleChange} value={registerData.email} />
                        <input required type='password' placeholder='Password' name='password' onChange={handleChange} value={registerData.password} />
                        <input required type='password' placeholder='Confirmar password' name='password_confirmation' onChange={handleChange} value={registerData.password_confirmation} />
                        <input required type='text' placeholder='Celular' name='phone' onChange={handleChange} value={registerData.phone} />
                        <input required className={styles.submitbutton} type='submit' value='Registrarse' />
                    </form>
                    {registerError ? <h4 className={styles.loginerrormsg}>{message.first} <span className={styles.errormsgsecondline}>{message.second}</span></h4> : <p></p>}
                </>
            : 
                <Success />
            }
            </div>
            <div className={styles.btnContainer}>
            <Link href='/access'>
                <Button>
                    Atrás
                </Button>
            </Link>
            </div>
        </div>
  );
}

export default Register;
