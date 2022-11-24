import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

const initialObj = {
    name: '',
    phone: ''
}

const ProfileDetail = () => {
    const { user, setUser } = useContext(StoreContext);
    const [newValues, setNewValues] = useState(initialObj);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userStorage = JSON.parse(sessionStorage.getItem('session'));
        (async () => {
            try {
                const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${router.query.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': userStorage.token }
                  });
                  const data = await rs.json();
                  setProfile(data);
                  setLoading(true);
                  setNewValues({
                    name: data.name,
                    phone: data.phone
                  })
            } catch {
                console.log('error', e);
            }
        })();
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        const userStorage = JSON.parse(sessionStorage.getItem('session'));
        (async () => {
            try {
                const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${router.query.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': userStorage.token },
                    body: JSON.stringify({ name: newValues.name, phone: newValues.phone })
                  });
                if (rs.status === 200) {
                    setUser({
                        ...user,
                        name: newValues.name,
                        phone: newValues.phone
                    });
                    setSuccess(true);
                    setTimeout(() => {
                        router.push('/profile');
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
                <h1 className={styles.title}>Perfil</h1>
            </div>
            <div className={styles.subcontainer}>
                {loading && !success ?
                    <form onSubmit={handleUpdate}>
                        <input type="text" name="email" disabled value={profile.email} />
                        <input type="text" name="name" onChange={handleNewValue} value={newValues.name} />
                        <input type="text" name="phone" placeholder='Teléfono' onChange={handleNewValue} value={newValues.phone} />
                        <input className={styles.submitbutton} type='submit' value='Guardar' />
                        <Link href={'/profile'}>
                            <Button>Cancelar</Button>
                        </Link>
                    </form>
                : success ? <Success /> : ''}
            </div>
            <div className={styles.btnContainer}>
            </div>
        </div>
    );
}

export default ProfileDetail;