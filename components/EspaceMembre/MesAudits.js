import styles from '../../styles/MesAudits.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/user';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar.js';

function MesAudits() {
    const [premiereAudit, setPremiereAudit] = useState('');
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = () => {};

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <>
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.rightSection}>
                <h2 className={styles.title}>Mes derniers rapports</h2>
                {/* <input
                    onChange={(e) => setPremiereAudit(e.target.value)}
                    value={premiereAudit}
                    className={styles.inputAudit}
                />
                <button onClick={handleSubmit} className={styles.button}>
                    Effectuer mon premier audit
                </button>
                <div>
                    {user.token && (
                        <button onClick={handleLogout} className={styles.footerButton}>
                            Se déconnecter
                        </button>
                    )}
                </div>*/}
            </div>
        </div>
        </>
    );
}

export default MesAudits;