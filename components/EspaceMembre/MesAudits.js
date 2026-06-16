import styles from '../../styles/MesAudits.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar.js';
import Footer from '../nav/Footer.js';
import Analyse from '../Analyse.js';
import ListAudits from './ListAudits.js';

function MesAudits() {
    const user = useSelector((state) => state.user.value);
    const router = useRouter();

    const [audits, setAudits] = useState([]);

    useEffect(() => {
        if (!user?.token) return;
        fetch(`${process.env.NEXT_PUBLIC_URL}/audit/all`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.result) setAudits(data.audits);
            });
    }, [user?.token]);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.rightSection}>
                <h2 className={styles.title}>Mes derniers rapports</h2>

                {audits.length > 0
                    ? <ListAudits audits={audits} />
                    : <Analyse variant="dashboard" buttonLabel="Lancer mon premier audit !" />
                }

                <Footer variant="dashboard" />
            </div>
        </div>
    );
}

export default MesAudits;