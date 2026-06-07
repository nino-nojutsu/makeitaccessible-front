import styles from '../styles/MonCompte.module.css';
import {useState} from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux';

function MesAudits() {
    
    const [premiereAudit, setPremiereAudit] = useState('');

    const user = useSelector((state) => state.user.value);
     
     const handleSubmit = () => {

     };

    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.leftSection}>
                        <Link href="/mes-audits" className={styles.navLink}>Mes audits</Link>
                        <Link href="/mon-compte" className={styles.navLink}>Mon compte</Link>
                        <Link href="/parametres" className={styles.navLink}>Paramètres</Link>
                        </div>
                        
                        <div className={styles.rightSection}>
                            <h2 className={styles.title}>Mes derniers rapports</h2>
                            <input onChange={(e) => setPremiereAudit(e.target.value)} value={premiereAudit}  className={styles.inputAudit}/>
                            <button onClick={() => handleSubmit()} className={styles.button}>Effectuer mon premier audit</button>
                            </div>
                            </div>
                            </div>
                            );
                        }
                        export default MesAudits;