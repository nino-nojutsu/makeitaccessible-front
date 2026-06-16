import styles from '../../styles/Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar.js';
import Footer from '../nav/Footer.js';
import Link from 'next/link';
import Analyse from '../Analyse.js';

/**
 * Dashboard => Composant principal de l'espace membre
 * Précisions => Props : passage de variant à <Analyse> et <Footer>
 */
function Dashboard() {

  /** store Redux **/
  // useSelector lit l'état global du store Redux
  // Rappel => user est persisté dans le localStorage via redux-persist
  const user = useSelector((state) => state.user.value);

  const router = useRouter();

  /** state local **/
  // useState => leur changement déclenche un re-rendu automatique
  const [audits, setAudits] = useState([]);
  const [siteSummaries, setSiteSummaries] = useState([]);

  /**
   * 1. Récupère tous les audits de l'utilisateur
   * useEffect #1 => Se déclenche au montage + à chaque fois que user.token change
   * => Si user.token est null (non connecté), on sort immédiatement
   */
  useEffect(() => {
    if (!user.token) return;

    fetch(`${process.env.NEXT_PUBLIC_URL}/audit/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        // On appelle le setter pour mettre à jour le state
        // => React détecte le changement et re-rend le composant
        // => Ce changement déclenche aussi useEffect #2
        if (data.result) setAudits(data.audits);
      });
  }, [user.token]);

  /**
   * 2. Pour chaque site unique, récupère le score global
   * useEffect #2 :
   * => Se déclenche automatiquement quand audits change (rempli par useEffect #1)
   */
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

  /**
   * Données pour meubler
   * Pas de useState redondant => recalculées à chaque re-rendu automatiquement
   */

  // Déduplication des sites pour le compteur => même logique que dans useEffect #2
  const uniqueSites = audits.reduce((acc, audit) => {
    if (audit.site && !acc.find(s => s._id === audit.site._id)) {
      acc.push(audit.site);
    }
    return acc;
  }, []);

  // Score moyen des sites (basé sur les scores globaux fusionnés, pas les pages individuelles)
  const averageScore = siteSummaries.length > 0
    ? Math.round(
        siteSummaries.reduce((sum, s) => sum + (s.summary?.score || 0), 0)
        / siteSummaries.length
      )
    : null;

  /**
   * Calculent couleur et mention selon le score RGAA
   * Rappel => même principe que sur le score des audits
   */
  function getScoreColor(score) {
    if (score === 100) return "#22c55e"; // vert => totalement conforme
    if (score >= 50) return "#f97316";  // orange => partiellement conforme
    return "#e63946";                    // rouge => non conforme
  }

  function getScoreMention(score) {
    if (score === 100) return "Totalement conforme";
    if (score >= 50) return "Partiellement conforme";
    return "Non conforme";
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dashboardContainer}>

        {/* Sidebar : composant autonome, lit le store Redux lui-même via useSelector */}
        <Sidebar />

        <div className={styles.rightSection}>

          {/* user.firstName vient du store Redux, dispatché lors du login */}
          <span className={styles.hello}>Hello {user.firstName} !</span>
          <h2 className={styles.title}>Bienvenue sur votre tableau de bord</h2>
          <p>Depuis cet espace, vous pouvez accéder à vos audits, gérer votre compte et configurer vos paramètres.</p>

          {/* Stats globales => données pour meubler, recalculé à chaque re-rendu */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{uniqueSites.length}</span>
              <span className={styles.statLabel}>Sites suivis</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{audits.length}</span>
              <span className={styles.statLabel}>Pages auditées</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {averageScore !== null ? `${averageScore}%` : '-'}
              </span>
              <span className={styles.statLabel}>Score moyen</span>
            </div>
          </div>

          {/* Mes sites => siteSummaries rempli par useEffect #2 */}
          <section className={styles.section}>
            <h3>Mes sites</h3>

            {/* Rendu conditionnel : si aucun site, message vide */}
            {siteSummaries.length === 0 && (
              <p>Aucun site audité pour le moment.</p>
            )}

            {/* .map() transforme chaque siteData en JSX => une carte par site */}
            {siteSummaries.map((siteData, index) => {
              // score défini ici dans le .map(), pas en dehors
              const score = siteData.summary.score;
              return (
                <div key={index} className={styles.auditSection}>
                  <div className={styles.auditRow}>
                    <span>{siteData.site.domain}</span>
                    {/* style inline : nécessaire ici car la couleur est dynamique */}
                    <span
                      role="status"
                      className={styles.mention}
                      style={{ color: getScoreColor(score) }}
                    >
                      <strong>{getScoreMention(score)}</strong>
                    </span>
                    <span style={{ color: getScoreColor(score) }}>
                      {score}%
                    </span>

                    <button
                      onClick={() => router.push(`/sites/${siteData.site._id}`)}
                      className="button button-action"
                    >
                      Voir le détail
                    </button>
                  </div>
                </div>
              );
            })}

            <div className={styles.sectionFooter}>
              <button
                onClick={() => router.push('/mes-audits')}
                className="button button-action"
              >
                Voir tous mes audits
              </button>
            </div>
          </section>

          {/* Rendu conditionnel : affiche le formulaire d'audit uniquement si aucun audit */}
          {/* Props => variant="dashboard" adapte le style et le texte du bouton */}
          {audits.length === 0 && <Analyse variant="dashboard" />}

        </div>
      </div>

      {/* Footer en dehors du dashboardContainer => pleine largeur en bas */}
      {/* Props => variant="dashboard" affiche une version simplifiée sans illustration */}
      <Footer variant="dashboard" />
    </div>
  );
}

export default Dashboard;