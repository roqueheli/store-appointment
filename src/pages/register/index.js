import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';
import Success from '../../components/success/Success';

const initialObject = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: ''
}

const Register = () => {
    const [registerData, setRegisterData] = useState(initialObject);
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            (async () => {
                try {
                    const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(form),
                    });
                    if (rs.status === 200) {
                        const data = await rs.json();
                        setSuccess(true);
                        // setUser({ username: data.username, email: registerData.email, avatar: '', token: data.token });
                        router.push('/login');
                    }
                } catch (e) {
                    console.log('error', e);
                }
            })();
        }
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
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder='Nombre' name="name" onChange={handleChange} value={registerData.name} />
                    <input required type="email" placeholder='Email' name="email" onChange={handleChange} value={registerData.email} />
                    <input required type="password" placeholder='Password' name="password" onChange={handleChange} value={registerData.password} />
                    <input required type="password" placeholder='Confirmar password' name="confirm" onChange={handleChange} value={registerData.confirm} />
                    <input required type="text" placeholder='Celular' name="phone" onChange={handleChange} value={registerData.phone} />
                    <input required className={styles.submitbutton} type="submit" value='Registrarse' />
                </form>
                : <Success />
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