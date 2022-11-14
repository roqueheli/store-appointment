import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { logout, userStateChange, loginWithGoogle } from '../../firebase/client';
import Button from '../../components/Button';
import { StoreContext } from '../../context/store';
import { FcGoogle } from 'react-icons/fc';
import { MdDateRange, MdLogout } from 'react-icons/md';
import styles from './styles.module.css';

const Login = ({ setLogin }) => {
    const { user, setUser } = useContext(StoreContext);
    const googleRef = useRef();
    const loginRef = useRef();
    const appointmentRef = useRef();
    const backRef = useRef();
    const logoutRef = useRef();
    
    useEffect(() => {
        userStateChange(setUser);
    }, []);
    
    const handleGoogleLogin = (e) => {
        loginWithGoogle().then(userStateChange(setUser))
        .catch(err => console.log('error', err));
    };
    
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const handleClick = () => {
        setLogin(false);
    }

    return (
        <div className={styles.container}>
            <Link href='/'>
                <img className={styles.logostyle} src="./mrbarber.jpeg" alt="logo" />
            </Link>
            <div className={styles.subcontainer}>
                {user === null &&
                    <>
                        <Button ref={googleRef} onClick={handleGoogleLogin}>
                            <FcGoogle />
                            Login with Google
                        </Button>
                        <Link href='/access'>
                            <Button ref={loginRef}>
                                Login / Registro
                            </Button>
                        </Link>
                        <Button ref={backRef} onClick={handleClick}>
                            Atrás
                        </Button>
                    </>
                }
                {user ?
                    <>
                        <Link href="/profile">
                            <div className={styles.avatarContainer}>
                                <img className={styles.avatar} src={user.avatar} alt={user.username} />
                                <strong>{user.username}</strong>
                            </div>
                        </Link>
                        <Link href="/appointment">
                        <Button ref={appointmentRef}>
                            <MdDateRange />
                            Reserva ahora
                        </Button>
                        </Link>
                        <Button ref={logoutRef} onClick={handleLogout}>
                            <MdLogout />
                            Logout
                        </Button>
                    </>
                : ''}
            </div>
        </div>
    );
}

const Home = () => {
    const [login, setLogin] = useState(false);
    const loginRef = useRef();
    const guestRef = useRef();
    const backRef = useRef();
    
    const handleClick = () => {
        setLogin(!login);
    }

    return (
        <>
            {!login ?             
                <div className={styles.container}>
                    <Link href='/'>
                        <img className={styles.logostyle} src="./mrbarber.jpeg" alt="logo" />
                    </Link>
                    <div className={styles.subcontainer}>
                        <Button ref={loginRef} onClick={handleClick}>
                            Login
                        </Button>
                        <Link href="/guest">
                        <Button ref={guestRef}>
                            <MdDateRange />
                            Reserva invitado
                        </Button>
                        </Link>
                        <Link href='/'>
                            <Button ref={backRef}>
                            Atrás
                            </Button>
                        </Link>
                    </div>
                </div>
             : <Login setLogin={setLogin} />
            }
        </>
    );
}

export default Home;