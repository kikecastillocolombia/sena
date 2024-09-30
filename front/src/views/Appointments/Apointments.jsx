import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, selectAppointments } from '../../redux/appointmentsSlice';
import { useNavigate } from 'react-router-dom';
import CardAppointment from "../../components/CardAppointment/CardAppointment";
import styles from "./Appointments.module.css";
import NoAppointmentsMessage from '../../components/NoAppointmentMessage/NoAppointmentsMessage'

const Appointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const appointments = useSelector(selectAppointments);
    const { loading, error } = useSelector((state) => state.appointments);
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/home'); // Redirige a Home si no está logueado
        } else if (user) {
            dispatch(fetchAppointments(user.id)); // Solicita los turnos del usuario
        }
    }, [dispatch, navigate, isLoggedIn, user]);

    if (!isLoggedIn) {
        return null; // Retorna null para evitar el renderizado del componente si no está logueado
    }

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Tus Turnos</h1>
            <div className={styles.cardsGrid}>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <CardAppointment 
                            key={appointment.id}
                            id={appointment.id}
                            date={appointment.date}
                            time={appointment.time}
                            status={appointment.status}
                        />
                    ))
                ) : (
                    <NoAppointmentsMessage /> // Muestra el mensaje si no hay turnos
                )}
            </div>
        </div>
    );
};

export default Appointments;
