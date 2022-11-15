import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { logout, userStateChange, loginWithGoogle } from '../../firebase/client';
import Button from '../../components/Button';
import { StoreContext } from '../../context/store';
import { FcGoogle } from 'react-icons/fc';
import { MdDateRange, MdLogout } from 'react-icons/md';
import styles from './styles.module.css';

const Login = ({ setLogin, user, setUser }) => {
    const googleRef = useRef();
    const loginRef = useRef();
    const appointmentRef = useRef();
    const backRef = useRef();
    const logoutRef = useRef();
    
    const handleGoogleLogin = (e) => {
        e.preventDefault();
        loginWithGoogle().then(userStateChange(setUser))
        .catch(err => console.log('error', err));
    };
    
    const handleLogout = (e) => {
        e.preventDefault();
        if(!user?.token) {
            logout();
        } else {
            sessionStorage.removeItem('session');
            setUser(null);
        }
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
                                {user.avatar !== '' ?
                                    <img className={styles.avatar} src={user.avatar} alt={user.username} /> :
                                    <span className={styles.noavatar}>{user.username.toUpperCase().slice(0,1)}</span>
                                }
                                <strong>{`${user.username[0].toUpperCase()}${user.username.substring(1)}`}</strong>
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
    const { user, setUser } = useContext(StoreContext);
    const [login, setLogin] = useState(false);
    const loginRef = useRef();
    const guestRef = useRef();
    const backRef = useRef();

    useEffect(() => {
        const userStorage = JSON.parse(sessionStorage.getItem('session'));
        if (userStorage) {
            setUser(userStorage);
            setLogin(true);
        } else {
            userStateChange(setUser);
            if (user) setLogin(true);
        }
    }, []);
    
    const handleClick = () => {
        setLogin(true);
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
             : <Login setLogin={setLogin} user={user} setUser={setUser} />
            }
        </>
    );
}

export default Home;