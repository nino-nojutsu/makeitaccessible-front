import styles from '../../styles/MesAudits.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar.js';
import Footer from '../nav/Footer.js';
import Analyse from '../Analyse.js';
import ListAudits from './ListAudits.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function MesAudits() {
  const user = useSelector((state) => state.user.value);
  const [audits, setAudits] = useState([]);
  const [siteSummaries, setSiteSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction réutilisable : récupère tous les audits + leurs résumés par site
  const fetchAllAudits = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/audit/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then(r => r.json())
      .then(async (data) => {
        if (!data.result) return;
        setAudits(data.audits);

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
  };


  // useEffect 1 => charge tous les audits au montage du composant
  useEffect(() => {
    if (!user?.token) return;
    fetchAllAudits();
  }, [user?.token]);

  // useEffect 2 => pour rechercher un audit (et réaffiche tout si le champ est vidé avec le site)
  useEffect(() => {
    if (!user?.token) return;

    if (!searchTerm) {
      fetchAllAudits(); // champ vidé => retour à la liste complète
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_URL}/audit/search/${user.token}?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAudits(data.result ? data.search : []);
      })
      .catch((error) => console.error('Erreur lors de la recherche :', error));
  }, [searchTerm, user?.token]);
  

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


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.rightSection}>
        <h1>Mes derniers rapports</h1>
        <div role="search" aria-label="rechercher un audit" className={styles.searchBar}>
          <div>
            <FontAwesomeIcon
              icon={faSearch}
              aria-hidden="true"
               className={styles.searchIcon}
            />
            <label htmlFor="search-audit-input" className={styles.visuallyHidden}>
              Rechercher un audit
            </label>
            <input
              id="search-audit-input"
              name="search-audit"
              type="text"
              placeholder="...Rechercher un audit"
              onChange={handleSearchChange}
            />

          </div>
        </div>

        {audits.length > 0 ? (
          <ListAudits
            audits={audits}
            siteSummaries={siteSummaries}
            onAuditDeleted={handleAuditDeleted}
            onSiteDeleted={handleSiteDeleted}
          />
        ) : searchTerm ? (
          <p className="alert alert-error"> Aucun audit ne correspond à votre recherche.</p>
        ) : (
          <Analyse variant="dashboard" buttonLabel="Lancer mon premier audit !" />
        )}

        <Footer variant="dashboard" />
      </div>
    </div>
  );
}

export default MesAudits;