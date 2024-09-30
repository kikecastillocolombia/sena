import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import imagen from '../../assets/errorPage.jpeg'

const ErrorPage = () => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate('/home');
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>¡Página no encontrada!</h1>
            <div className={styles.imageContainer}>
                <img src={imagen} alt="Tijeras" className={styles.image} />
            </div>
            <p className={styles.message}>Redirigiendo en {countdown} segundos...</p>
        </div>
    );
};

export default ErrorPage;
