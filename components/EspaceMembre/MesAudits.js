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
  const [audits, setAudits] = useState([]);
  const [siteSummaries, setSiteSummaries] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    // 1. Récupère tous les audits
    fetch(`${process.env.NEXT_PUBLIC_URL}/audit/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then(r => r.json())
      .then(async (data) => {
        if (!data.result) return;
        setAudits(data.audits);

        // 2. Dédoublonne les siteIds et fetch les summaries en parallèle
        const uniqueSiteIds = Object.keys(Object.groupBy(data.audits, a => a.site?._id));

        const results = await Promise.all(
          uniqueSiteIds.map(siteId =>
            fetch(`${process.env.NEXT_PUBLIC_URL}/sites/${siteId}/audit-summary`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: user.token }),
            }).then(r => r.json())
          )
        );

        setSiteSummaries(results.filter(r => r.result));
      });
  }, [user?.token]);

  // permet de mettre à jour après suppression audit
  const handleAuditDeleted = (auditId) => {
  // Met à jour audits localement => déclenche useEffect #2 => recalcule siteSummaries
  setAudits(prev => prev.filter(a => a._id !== auditId));
};


  // permet de mettre à jour après suppression audit
  const handleSiteDeleted = (siteId) => {
  // Met à jour audits localement => déclenche useEffect #2 => recalcule siteSummaries
  setAudits(prev => prev.filter(a => a.site?._id !== siteId));
};




  

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.rightSection}>
                <h1>Mes derniers rapports</h1>

                {audits.length > 0
                // si audits, props qu'on va passer à ListAudits
                    ? <ListAudits audits={audits} siteSummaries={siteSummaries} onAuditDeleted={handleAuditDeleted} onSiteDeleted={handleSiteDeleted} />
                    // sinon on renvoie la variante d'Analyse dédiée à l'espace Dashboard
                    : <Analyse variant="dashboard" buttonLabel="Lancer mon premier audit !" />
                }

                <Footer variant="dashboard" />
            </div>
        </div>
    );
}

export default MesAudits;