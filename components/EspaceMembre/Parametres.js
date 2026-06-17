import styles from '../../styles/Dashboard.module.css';
import Sidebar from './Sidebar.js';

function Parametres() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.rightSection}>
                <h2 className={styles.title}>Paramètres</h2>
                {/* contenu à venir */}
            </div>
        </div>
    );
}

export default Parametres;