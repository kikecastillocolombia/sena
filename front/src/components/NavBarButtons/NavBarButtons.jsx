import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from "./NavBarButtons.module.css";

export const NavBarButtons = () => {
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    return (
        <div className={styles.linksSection}>
            {isAuthenticated ? (
                <>
                    <NavLink
                        to="/home"
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        INICIO
                    </NavLink>
                    <NavLink
                        to="/appointment"
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        TURNOS
                    </NavLink>
                    <NavLink
                        to="/appointment/schedule"
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        NUEVO TURNO
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        to="/register"
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        REGISTRO
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        LOGIN
                    </NavLink>
                </>
            )}
        </div>
    );
};
