import styles from '../../styles/Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar.js';
import Footer from '../nav/Footer.js';
import Link from 'next/link';
import Analyse from '../Analyse.js';


function Dashboard() {

  const router = useRouter();

  /** store **/
  // Récupère les infos de l'utilisateur connecté depuis le store Redux (token, firstName, username)
  const user = useSelector((state) => state.user.value);

  /** state **/
  // Tableau de tous les audits de l'utilisateur (une entrée par page auditée)
  const [audits, setAudits] = useState([]);
  // Tableau des résumés par site (score global + détail des pages)
  const [siteSummaries, setSiteSummaries] = useState([]);

  // 1. Récupère tous les audits de l'utilisateur connecté
  // Si pas de token (utilisateur non connecté)... On ne fait rien
  useEffect(() => {
    if (!user.token) return;
    // ... Puis appeler la route avec tous les audits
    fetch(`${process.env.NEXT_PUBLIC_URL}/audit/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('audits reçus', data);
        // Si la requête a réussi, on met à jour le state audits
        // ce qui va déclencher le useEffect suivant via son seter dédié
        if (data.result) setAudits(data.audits);
      });

  }, [user.token]);

  // 2. Pour chaque site unique, récupère le score global (fusion de toutes ses pages)
  // Déclenché automatiquement quand le state audits change (rempli par l'étape 1)
  useEffect(() => {
    // Si pas de token ou pas d'audits, on ne fait rien
    if (!user.token || audits.length === 0) return;

    // Déduplique les sites : un audit = une page, plusieurs pages peuvent appartenir au même site
    // On utilise une Map pour ne garder qu'une entrée par site (en pointe la clé = _id du site)
    const uniqueSitesMap = new Map();
    audits.forEach(audit => {
      if (audit.site && !uniqueSitesMap.has(audit.site._id)) {
        uniqueSitesMap.set(audit.site._id, audit.site);
      }
    });
    console.log('uniqueSitesMap', uniqueSitesMap);

    // Extrait uniquement les _id des sites uniques pour les passer aux requêtes suivantes
    const uniqueSiteIds = Array.from(uniqueSitesMap.keys());

    // Pour chaque site unique, appelle POST /sites/:siteId/audit-summary
    // Promise.all lance toutes les requêtes en parallèle et attend qu'elles soient toutes résolues
    Promise.all(
      uniqueSiteIds.map(siteId =>
        fetch(`${process.env.NEXT_PUBLIC_URL}/sites/${siteId}/audit-summary`, {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: user.token }),

        }).then(res => res.json())

      )
    ).then(results => {
      console.log('résultats sites', results);
      // On ne garde que les résultats valides (result: true)
      // Un résultat peut être invalide si l'utilisateur n'a pas accès au site (403)
      setSiteSummaries(results.filter(r => r.result));
    });
  }, [audits, user.token]);

  /** données de l'utilisateur pour meubler **/
  // Calculées à la volée depuis le state audits, sans useState redondant

  // Nombre de sites uniques suivis (dédupliqués par _id)
  const uniqueSites = [...new Set(audits.map(a => a.site?._id))];

  // Score moyen des sites (basé sur le score global fusionné de chaque site)
  // siteSummaries est rempli par l'étape 2 — un objet par site avec son score global
  const averageScore = siteSummaries.length > 0
    ? Math.round(siteSummaries.reduce((sum, s) => sum + (s.summary?.score || 0), 0) / siteSummaries.length)
    : null;

    console.log('user', user);

  return (
    <div className={styles.pageWrapper}>
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.rightSection}>
        <h2 className={styles.title}>Hello {user.firstName}</h2>
        <h3 className={styles.title}>Bienvenue sur votre tableau de bord</h3>
        <p>Depuis cet espace, vous pouvez accéder à vos audits, gérer votre compte et configurer vos paramètres.</p>

        {/* Mes sites */}
        <section className={styles.section}>
          <h3>Mes sites</h3>
          {siteSummaries.length === 0 && <p>Aucun site audité pour le moment.</p>}
          {siteSummaries.map((siteData, index) => (
            <div key={index} className={styles.auditRow}>
              <span>{siteData.site.domain}</span>
              <span>{siteData.summary.score}%</span>
              <Link href={`/sites/${siteData.site._id}`}>Voir le détail</Link>
            </div>
          ))}
          <Link href={`/mes-audits`}>Voir tous mes audits</Link>
        </section>

        {/* Si aucun audit : invite à lancer un premier audit */}
        {audits.length === 0 && <Analyse variant="dashboard" />}
      </div>
    </div>
    <Footer variant="dashboard" />
    </div>
  );

}

export default Dashboard;