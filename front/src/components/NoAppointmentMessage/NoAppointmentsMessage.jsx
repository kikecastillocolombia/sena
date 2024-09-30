import styles from './NoAppointmentsMessage.module.css'; 

const NoAppointmentsMessage = () => {
    return (
        
            <div className={styles.message}>
                <p>No hay turnos agendados.</p>
            </div>
        
    );
};

export default NoAppointmentsMessage;
