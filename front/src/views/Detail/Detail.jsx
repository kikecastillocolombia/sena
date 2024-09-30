import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css'; 

axios.defaults.baseURL = 'http://localhost:3000';

const Detail = () => {
    const { id } = useParams(); 
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/appointment/${id}`)
            .then(response => {
                setAppointment(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching appointment details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!appointment) {
        return <div className={styles.noAppointment}>No appointment found</div>;
    }

    return (
        <div className={styles.detailContainer}>
            <div className={styles.detailCard}>
                <h1 className={styles.detailTitle}>Appointment Details</h1>
                <div className={styles.detailInfo}>
                    <p><strong>Date:</strong> {appointment.date || 'Not available'}</p>
                    <p><strong>Time:</strong> {appointment.time || 'Not available'}</p>
                    {/* Elimina la línea para la descripción */}
                    <p><strong>Status:</strong> {appointment.status || 'Not available'}</p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
