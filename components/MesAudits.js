import styles from '../styles/MesAudits.module.css';
import {useState} from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { logout } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';


function MesAudits() {
    
    const [premiereAudit, setPremiereAudit] = useState('');

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const router = useRouter();
     
     const handleSubmit = () => {

     };

     const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    }

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
                        
                        <div className={styles.rightSection}>
                            <h2 className={styles.title}>Mes derniers rapports</h2>
                            <input onChange={(e) => setPremiereAudit(e.target.value)} value={premiereAudit}  className={styles.inputAudit}/>
                            <button onClick={() => handleSubmit()} className={styles.button}>Effectuer mon premier audit</button>
                            <div>
                                {user.token && <button onClick={() => handleLogout()} className={styles.footerButton}>Se déconnecter</button>}
                                </div>
                            </div>
                            </div>
                            </div>
                            );
                        }
                        export default MesAudits;