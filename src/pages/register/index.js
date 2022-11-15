import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';
import Success from '../../components/success/Success';

const validationsForm = (form) => {
    let errors = {};
    if (!form.name.trim()) errors.name = "El campo 'Nombre' es requerido";
    if (!form.email.trim()) errors.email = "El campo 'Email' es requerido";
    if (!form.password.trim()) errors.password = "El campo 'Contraseña' es requerido";
    if (!form.confirm.trim()) errors.confirm = "El campo 'Confirmar contraseña' es requerido";
    if (!form.phone.trim()) errors.phone = "El campo 'Celular' es requerido";
    return errors;
};


const initialObject = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: ''
}

const Register = () => {
    const [registerData, setRegisterData] = useState(initialObject);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState(initialObject);
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
    
    const handleBlur = (e) => {
        setErrors(validationsForm(form));
    };

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Registrarse</h1>
            </div>
            <div className={styles.subcontainer}>
                {!success ?
                <form onSubmit={handleSubmit}>
                    <input required onBlur={handleBlur} type="text" placeholder='Nombre' name="name" onChange={handleChange} value={registerData.name} />
                    {errors.name ? <p className={styles.errors}>{errors.name}</p> : ''}
                    <input required onBlur={handleBlur} type="email" placeholder='Email' name="email" onChange={handleChange} value={registerData.email} />
                    {errors.email ? <p className={styles.errors}>{errors.email}</p> : ''}
                    <input required onBlur={handleBlur} type="password" placeholder='Password' name="password" onChange={handleChange} value={registerData.password} />
                    {errors.password ? <p className={styles.errors}>{errors.password}</p> : ''}
                    <input required onBlur={handleBlur} type="password" placeholder='Confirmar password' name="confirm" onChange={handleChange} value={registerData.confirm} />
                    {errors.confirm ? <p className={styles.errors}>{errors.confirm}</p> : ''}
                    <input required onBlur={handleBlur} type="text" placeholder='Celular' name="phone" onChange={handleChange} value={registerData.phone} />
                    {errors.phone ? <p className={styles.errors}>{errors.phone}</p> : ''}
                    <input required onBlur={handleBlur} className={styles.submitbutton} type="submit" value='Registrarse' />
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