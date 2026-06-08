import styles from '../styles/MonCompte.module.css';
import {useState} from 'react';
import Link from 'next/link'
import Image from 'next/image';


function Parametres() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <div className={styles.logoWrapper}>
                        <Image
                        src="/favicon-makeitaccessible.svg"
                        alt="logo"
                        width={32}
                        height={32}
                        />
                        <div className={styles.logoTextWrapper}>
                            
                        </div>
                        <div className={styles.logoContainer}>
                            <span className={styles.logoFirstText}>MakeIt</span>
                            <span className={styles.logoSecondText}>Accessible</span>
                            </div>
                            </div>
                                                    
                        <Link href="/mes-audits" className={styles.navLink}>Mes audits</Link>
                        <Link href="/mon-compte" className={styles.navLink}>Mon compte</Link>
                        <Link href="/parametres" className={styles.navLink}>Paramètres</Link>
                        </div>
                        </div>
                        </div>
    );
}

export default Parametres;