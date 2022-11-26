import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Button from '../../components/Button';
import Success from '../../components/Success/Success';
import { StoreContext } from '../../context/store';
import styles from './styles.module.css';

const initialObj = {
  email: '',
  name: '',
  phone: '',
};

function ProfileDetail() {
  const { user, setUser } = useContext(StoreContext);
  const [newValues, setNewValues] = useState(initialObj);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const cancelRef = useRef();

  useEffect(() => {
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${router.query.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: userStorage.token },
        });
        const data = await rs.json();
        setLoading(true);
        setNewValues({
          email: data.email,
          name: data.name,
          phone: data.phone,
        });
      } catch (error) {
        setNewValues({ error });
      }
    })();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    (async () => {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}users/${router.query.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: userStorage.token },
          body: JSON.stringify({ name: newValues.name, phone: newValues.phone }),
        });
        if (rs.status === 200) {
          setUser({
            ...user,
            name: newValues.name,
            phone: newValues.phone,
          });
          setSuccess(true);
          setTimeout(() => {
            router.push('/profile');
          }, 3000);
        } else {
          setUser({ error: 'Ha ocurrido un error' });
        }
      } catch {
        setUser({ error: 'Ha ocurrido un error' });
      }
    })();
  };

  const handleNewValue = (e) => {
    setNewValues({
      ...newValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Perfil</h1>
      </div>
      <div className={styles.subcontainer}>
        {(loading && !success)
          ? (
            <form onSubmit={handleUpdate}>
              <input type="text" name="email" disabled value={newValues.email} />
              <input type="text" name="name" placeholder="Nombre" onChange={handleNewValue} value={newValues.name} />
              <input type="text" name="phone" placeholder="Teléfono" onChange={handleNewValue} value={newValues.phone} />
              <input className={styles.submitbutton} type="submit" value="Guardar" />
              <Link href="/profile">
                <Button ref={cancelRef}>Cancelar</Button>
              </Link>
            </form>
          )
          : ''}
        {success ? <Success /> : ''}
      </div>
      <div className={styles.btnContainer} />
    </div>
  );
}

export default ProfileDetail;
