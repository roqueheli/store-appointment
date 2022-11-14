import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';

const initialObject = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: ''
}

const Register = () => {
    const [loginData, setLoginData] = useState(initialObject);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Registrarse</h1>
            </div>
            <div className={styles.subcontainer}>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Nombre' name="name" onChange={handleChange} value={loginData.name} />
                    <input type="email" placeholder='Email' name="email" onChange={handleChange} value={loginData.email} />
                    <input type="password" placeholder='Password' name="password" onChange={handleChange} value={loginData.password} />
                    <input type="password" placeholder='Confirmar password' name="confirm" onChange={handleChange} value={loginData.confirm} />
                    <input type="text" placeholder='Celular' name="phone" onChange={handleChange} value={loginData.phone} />
                    <input className={styles.submitbutton} type="submit" value='Registrarse' />
                </form>
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