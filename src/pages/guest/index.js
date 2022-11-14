import Link from 'next/link';
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" placeholder='Edgar Zambrano' name="name" onChange={handleChange} value={guessData.name} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='hola@mrbarber.cl' name="email" onChange={handleChange} value={guessData.email} />
                    </div>
                    <div>
                        <label htmlFor="phone">Teléfono</label>
                        <input type="text" placeholder='+56 9 9999 1234' name="phone" onChange={handleChange} value={guessData.phone} />
                    </div>
                </form>
            </div>
            <div className={styles.btnContainer}>
                <Link href='/appointment'>
                    <Button>
                        Agendar
                    </Button>
                </Link>
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