import styles from '../styles/MonCompte.module.css';
import {useState} from 'react';
import Link from 'next/link'

function Parametres() {
    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.leftSection}>
                        <Link href="/mes-audits" className={styles.navLink}>Mes audits</Link>
                        <Link href="/mon-compte" className={styles.navLink}>Mon compte</Link>
                        <Link href="/parametres" className={styles.navLink}>Paramètres</Link>
                        </div>
                        </div>
                        </div>
    );
}

export default Parametres;