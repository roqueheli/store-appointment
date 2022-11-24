import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

const initialObj = {
    email: '',
    temporal: '',
    newpass: '',
    confirm: ''
}

const PasswordReset = () => {
    const [newValues, setNewValues] = useState(initialObj);
    const router = useRouter();

    const handleUpdate = (e) => {
        e.preventDefault();
        (async () => {
            try {
                const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/reset_password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: newValues.email, temporal: newValues.temporal, newpass: newValues.newpass, confirm: newValues.confirm })
                  });
                if (rs.status === 200) {
                    setTimeout(() => {
                        router.push('/access');
                    }, 3000);
                } else {
                    console.log('error', e);
                }
            } catch {
                console.log('error', e);
            }
        })();
    }
    
    const handleNewValue = (e) => {
        setNewValues({
            ...newValues,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Contraseña</h1>
            </div>
            <div className={styles.subcontainer}>
                <form onSubmit={handleUpdate}>
                    <input required placeholder={'Email'} type="text" name="email" onChange={handleNewValue} value={newValues.email} />
                    <input required placeholder={'Contraseña temporal'} type="password" name="temporal" onChange={handleNewValue} value={newValues.temporal} />
                    <input required placeholder={'Nueva contraseña'} type="password" name="newpass" onChange={handleNewValue} value={newValues.newpass} />
                    <input required placeholder={'Confirmar contraseña'} type="password" name="confirm" onChange={handleNewValue} value={newValues.confirm} />
                    <input className={styles.submitbutton} type='submit' value='Cambiar contraseña' />
                </form>
            </div>
            <div className={styles.btnContainer}>
                <Link href={'/access'}>
                    <Button>Atrás</Button>
                </Link>
            </div>
        </div>
    );
}

export default PasswordReset;