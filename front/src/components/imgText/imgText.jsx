
import styles from "./imgText.module.css";
import { Link } from 'react-router-dom';

export const ImgText = () => {
    return (
        <div className={styles.imgText}>
            <div className={styles.textContainer}>
                <p className={styles.description}>
                    Transforma tu look con nuestros expertos en belleza. <br /> Cortes modernos, tratamientos innovadores y un ambiente relajante. <br /> Tu satisfacción es nuestra prioridad. <br /> ¡Reserva tu cita y brilla con nosotros!
                </p>
                <div className={styles.buttonContainer}>
                    <Link to="/login" className={styles.button}>Login</Link>
                    <Link to="/register" className={styles.button}>Register</Link>
                </div>
            </div>
        </div>
    );
};
