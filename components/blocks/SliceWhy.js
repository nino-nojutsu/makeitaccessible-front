
import styles from '../../styles/Home.module.css';

function SliceWhy() {

      return (

<section className={styles.sliceWhy}>
        <h2 className={styles.titleWhy}>Pourquoi rendre accessible votre site aux normes RGAA ?</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyBox}>
            <h3>106 critères RGAA 4.1 officiels</h3>
            <p>
              Nos tests sont basés sur le référentiel officiel publié par l'État français
              (DINUM), couvrant les niveaux A, AA et AAA.
            </p>
          </div>
          <div className={styles.whyBox}>
            <h3>Score pondéré intelligent</h3>
            <p>
              Pondération par importance (A x3, AA x2, AAA x1) pour prioriser les
              corrections à fort impact.
            </p>
          </div>
          <div className={styles.whyBox}>
            <h3>Rapport PDF professionnel</h3>
            <p>
              Export PDF complet avec détails par thématique, code source incriminé et
              suggestions de correction.
            </p>
          </div >
          <div className={styles.whyBox}>
            <h3>Dashboard collaboratif</h3>
            <p>
              Centralisez les audits de votre équipe.
              Historique complet, scores et suivi de progression.
            </p>
          </div>
          <div className={styles.whyBox}>
            <h3>Données sécurisées</h3>
            <p>
              Vos audits sont stockés de façon sécurisée avec Supabase.
              Aucune donnée n'est partagée avec des tiers.
            </p>
          </div>
          <div className={styles.whyBox}>
            <h3>Analyse instantanée</h3>
            <p>
              Résultats en quelques secondes directement dans votre navigateur.
              Zéro configuration requise.
            </p>
          </div>
        </div>
      </section>

      );
}
 
export default SliceWhy;