import styles from '../styles/MesAudits.module.css';
import { useState } from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { logout } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import Analyse from './Analyse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


function MesAudits() {

    const [premiereAudit, setPremiereAudit] = useState('');
    const [modalAudit, setModalAudit] = useState(false);
    const [auditsData, setAuditsData] = useState([]);

    const openAuditModal = () => {
        setModalAudit(true);
    };

    const handleCancelAudit = () => {
        setModalAudit(false);
    };

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    }
    
    useEffect(() => {
   fetch('http://localhost:3000/audit/audits')
     .then(response => response.json())
     .then(data => {
       setAuditsData(data.data);
     });
 }, []);

 
    
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
                    <button onClick={openAuditModal} className={styles.button}>Effectuer mon premier audit</button>
                    <div className={styles.searchBox}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass} className={styles.icon}
                        />

                        <input onChange={(e) => setPremiereAudit(e.target.value)} placeholder="Rechercher un audit" value={premiereAudit} className={styles.inputAudit} />
                    </div>
                    <Modal open={modalAudit} onCancel={handleCancelAudit} footer={null}>
                        <label className={styles.label}>Auditer mon site</label>
                        <br />

                        <p className={styles.helperText}>
                            Saisissez l'URL de votre site internet à auditer gratuitement !
                        </p>
                        <Image
                            src="/illustration_business_analysis"
                            alt="audit"
                            width={300}
                            height={300}
                            className={styles.image}
                        />
                        <Analyse />
                    </Modal>
                    {auditsData.map((audit, i) => 
                    <div key={i}>
                        <p>{audit.url}</p>
                        <p> {audit.status}</p>
                        </div>
                        )}
                        
                    <div>

                        {user.token && <button onClick={() => handleLogout()} className={styles.footerButton}>Se déconnecter</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MesAudits;