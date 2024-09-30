import { useDispatch } from 'react-redux';
import { cancelAppointment } from '../../redux/appointmentsSlice';
import { useNavigate } from 'react-router-dom';
import styles from './CardAppointment.module.css';

// eslint-disable-next-line react/prop-types
export default function CardAppointment({ id, date, time, status }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redirige a la página de detalles del turno al hacer clic en la tarjeta
    const handleRedirect = () => {
        navigate(`/appointment/${id}`);
    };

    // Maneja la lógica de cancelación al hacer clic en el botón "Cancelar"
    const handleCancelClick = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón cierre la tarjeta
        if (window.confirm(`Desea cancelar el turno: ${id}`)) {
            // Despacha la acción para cancelar el turno
            dispatch(cancelAppointment(id));
        }
    };

    return (
        <div className={styles.cardContainer} onClick={handleRedirect}>
            <div className={styles.cardContent}>
                <span><strong>Date:</strong> {date}</span>
                <span><strong>Time:</strong> {time}</span>
                {/* Elimina la línea para descripción */}
                {
                    status === "active" ? (
                        <div className={styles.activeContainer}>
                            <span className={styles.active}>Activo</span>
                            <button
                                className={styles.cancelButton}
                                onClick={handleCancelClick}
                            >
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <span className={styles.cancelled}>Cancelado</span>
                    )
                }
            </div>
        </div>
    );
}
