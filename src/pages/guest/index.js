import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.css';

const initialObject = {
    name: '',
    email: '',
    phone: ''
}

const Guest = () => {
    const [guessData, setGuessData] = useState(initialObject);
    const router = useRouter();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/service');
    }
    
    const handleChange = (e) => {
        setGuessData({
            ...guessData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Invitado</h1>
            </div>
            <div className={styles.subcontainer}>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder='Nombre' name="name" onChange={handleChange} value={guessData.name} />
                    <input required type="email" placeholder='Email' name="email" onChange={handleChange} value={guessData.email} />
                    <input required type="text" placeholder='Celular' name="phone" onChange={handleChange} value={guessData.phone} />
                    <input className={styles.submitbutton} type="submit" value='Agenda invitado' />
                </form>
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
}

export default Guest;