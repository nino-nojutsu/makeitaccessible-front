import styles from '../styles/Header.module.css';
import Image from 'next/image';

function Header() {

	return (
		<header className={styles.header} role="banner">
            <div className={styles.logoWrapper}>
                <div className={styles.iconWrapper}>
                <Image
                    src='/favicon-makeitaccessible.svg'
                    alt=''
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className={styles.favicon}/>
                </div>
                <div className={styles.logoTextWrapper}>
                <Image 
                    src='/images/logo-MakeItAccessible.svg'
                    alt='logo MakeItAccessible'
                    width={150}
                    height={150}
                    className={styles.logo}/>
                </div>
            </div>
                <nav aria-label="S'inscire ou se connecter" className={styles.modalesContainer}>
                    {/* integrate connexion modals */}
                    <button className={styles.btnConnected}>Se connecter</button>
                    <button className={styles.btnRegistration}>S'inscrire</button>
                </nav>
		</header>
	);
}

export default Header;
