import React from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import styles from './styles.module.css';

const WorkerDetail = () => {   
    return (
        <div className={styles.container}>
            <div className={styles.subcontainer}>WorkerDetail</div>
            <div className={styles.btnContainer}>
                <Link href='/workers'>
                <Button>
                    Atras
                </Button>
                </Link>
            </div>
        </div>
    );
}

export default WorkerDetail;
