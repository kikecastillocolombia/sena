import { ImgText } from "../../components/imgText/imgText";
import styles from "./Home.module.css";
import banner from "../../assets/banner1.png";

export default function Home() {
    return (
        <>
            <div className={styles.homeContainer}>
                <div>
                    <img src={banner} alt="Mela Belleza" className={styles.banner} />
                </div>
                <ImgText/>
            </div>
        </>
    );
}
