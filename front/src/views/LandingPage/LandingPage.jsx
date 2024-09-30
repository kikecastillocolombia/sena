import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import banner from "../../assets/banner1.png";

export const LandingPage = () => {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.landingContent}>
                <img src={banner} alt="Mela Belleza" className={styles.banner} />
                <p className={styles.description}>
                    Nuestro equipo de expertos está aquí para brindarte un servicio personalizado en un ambiente relajante y elegante.
                </p>
                <div className={styles.buttons}>
                    <Link to="/home" className={styles.button}>Ingresar</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
