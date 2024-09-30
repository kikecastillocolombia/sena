import styles from "./Navbar.module.css";
import { NavBarButtons } from "../NavBarButtons/NavBarButtons";
import logo from "../../assets/logo.jpeg";
import avatar from "../../assets/avatar.jpg";

export const Navbar = () => {
    return (
        <div className={styles.navContainer}>
            <div className={styles.logoSection}>
                <img src={logo} alt="Logo" />
            </div>
            <NavBarButtons />
            <div className={styles.avatarSection}>
                <img src={avatar} alt="Avatar" />
                {/* Puedes comentar o eliminar estos botones si no los necesitas por ahora */}
                {/* <button onClick={handleLogin}>Login</button> */}
                {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
        </div>
    );
};
