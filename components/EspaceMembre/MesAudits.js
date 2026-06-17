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

    useEffect(() => {
    if (!user.token || audits.length === 0) return;

    // 3. On évite de dupliquer les sites
    // reduce construit un tableau en n'ajoutant un site QUE s'il n'est pas déjà présent
    // Précision => acc = accumulateur (tableau en cours de construction)
    // Pour chaque audit, on cherche si son site._id est déjà dans acc
    const uniqueSites = audits.reduce((acc, audit) => {
      if (
        audit.site &&
        !acc.find(site => site._id === audit.site._id)
      ) {
        acc.push(audit.site);
      }
      return acc;
    }, []);

    // On extrait uniquement les _id pour les passer aux requêtes suivantes
    const uniqueSiteIds = uniqueSites.map(site => site._id);

    // Promise.all => lance toutes les requêtes en parallèle
    Promise.all(
      uniqueSiteIds.map(siteId =>
        fetch(`${process.env.NEXT_PUBLIC_URL}/sites/${siteId}/audit-summary`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: user.token }),
        }).then(res => res.json())
      )
    ).then(results => {
      // .filter() ne garde que les résultats valides (result: true)
      // Précisions => si une requête échoue (403, erreur réseau), elle n'affecte pas les autres
      setSiteSummaries(results.filter(r => r.result));
    });
  }, [audits, user.token]);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.rightSection}>
                <h1>Mes derniers rapports</h1>

                {audits.length > 0
                // si audits, props qu'on va passer à ListAudits
                    ? <ListAudits audits={audits} siteSummaries={siteSummaries} />
                    // sinon on renvoie la variante d'Analyse dédiée à l'espace Dashboard
                    : <Analyse variant="dashboard" buttonLabel="Lancer mon premier audit !" />
                }

                <Footer variant="dashboard" />
            </div>
        </div>
    );
}

export default MesAudits;