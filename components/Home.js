import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Analyse from './Analyse';
import Issue from "./Issue.js";
 
function Home() {

  return (
    <>
      {/* ── Hero ── */}
      <main className={styles.main}>
        {/* Hero - colonne gauche */}
        <section className={styles.heroLeft}>
          <p className={styles.subTitle}>Make It Accessible • Web App</p>
          <h1 className={styles.title}>
            Tous vos utilisateurs comptent, améliorez{' '}
            <span className={styles.highlight}>l'accessibilité</span> de votre site
          </h1>
          <p className={styles.description}>
            Un site qui réalise tous les tests d'accessibilité (RGAA 4.1) et renvoie{' '}
            <strong>un score</strong>, <strong>un rapport visuel</strong> et des{' '}
            <strong>recommandations priorisées</strong>.
            Pour les devs, PO, agences et auditeurs.
          </p>
          <p className={styles.ctaTitle}>
            Saisissez l'URL de votre site internet à auditer gratuitement !
          </p>
            <Analyse />
        </section>
 
        {/* Hero - colonne droite */}
        <section className={styles.heroRight}>
          <div className={styles.featureCard}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden="true">X</span>
              <div>
                <p className={styles.featureTitle}>Vue</p>
                <p className={styles.featureDescription}>Contrastes, alternatives textuelles, lecteurs d'écran</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden="true">X</span>
              <div>
                <p className={styles.featureTitle}>Audition</p>
                <p className={styles.featureDescription}>Sous-titres, transcriptions, alertes visuelles</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden="true">X</span>
              <div>
                <p className={styles.featureTitle}>Clavier</p>
                <p className={styles.featureDescription}>Navigation, focus, interactions sans souris</p>
              </div>
            </div> 
          </div>
          <div className={styles.boxInfos}>
              <div className={styles.box}>
                <span className={styles.badgeLabel}>Notre outil d'analyse pour</span>
                <strong>Les devs, les PO, les chefs de projets, les auditeurs.</strong>
              </div>
              <div className={styles.box}>
                <span className={styles.badgeLabel}>Échéance</span>
                <strong>LaCapsule project 28 juin 2026</strong>
              </div>
            </div>
        </section>
 
      </main>
 
      {/* ── Valorisation solution ── */}
      <section className={styles.sliceValorisation}>
        <h2>Notre <span className={styles.highlight}>référentiel</span> à portée de main</h2>
        <p>
          La mise en place d'une stratégie d'accessibilité numérique constitue une étape essentielle.
          Notre outil a été spécifiquement conçu en conformité avec le référentiel{' '}
          <a href='/'>RGAA 4.1</a> afin d'accompagner efficacement cette démarche.
        </p>
        <h2>Votre audit en seulement <span className={styles.highlight}>10 secondes</span></h2>
        <p>
          Consultez et exportez votre rapport d'accessibilité RGAA (PDF) avec une évaluation
          claire et des recommandations concrètes pour rendre votre site web plus inclusif et convivial.
        </p>
        <h2>Des <span className={styles.highlight}>expert·e·s</span> pour vous accompagner</h2>
        <p>
          Audits experts dans un tableau de bord en temps réel. Anomalies remontées sans délai.
          Progression visible sur chaque site, chaque jour.
          L'accessibilité s'intègre dans les mœurs de vos équipes.
        </p>
        <button type="button">Consultez le référentiel RGAA 4.1</button>
      </section>
 
      {/* ── Comment ça marche ── */}
      <section className={styles.sliceSteps}>
        <h2>Comment ça marche ?</h2>
        <p>En 4 étapes simples, obtenez un audit complet de l'accessibilité de votre site.</p>
        <ol className={styles.stepsList}>
          <li className={styles.stepItem}>
            <span className={styles.stepNumber}>01</span>
            <Image
              src='/images/icone-fleche.svg'
              alt=''
              aria-hidden="true"
              width={48}
              height={48}
              className={styles.icone}
            />
            <h3>Lancez votre audit</h3>
            <p>
              Renseignez l'URL de votre site pour analyser la page active
              selon les 106 critères du référentiel officiel.
            </p>
          </li>
          <li className={styles.stepItem}>
            <span className={styles.stepNumber}>02</span>
            <Image
              src='/images/icone-reglages.svg'
              alt=''
              aria-hidden="true"
              width={48}
              height={48}
              className={styles.icone}
            />
            <h3>Consultez les résultats</h3>
            <p>
              Score pondéré, erreurs par thématique, priorités de correction et suggestions détaillées.
            </p>
          </li>
          <li className={styles.stepItem}>
            <span className={styles.stepNumber}>03</span>
            <Image
              src='/images/icone-telechargement.svg'
              alt=''
              aria-hidden="true"
              width={48}
              height={48}
              className={styles.icone}
            />
            <h3>Exportez le rapport</h3>
            <p>
              Téléchargez le rapport PDF ou CSV. Consultez l'historique sur votre tableau de bord.
            </p>
          </li>
          <li className={styles.stepItem}>
            <span className={styles.stepNumber}>04</span>
            <Image
              src='/images/icone-progression.svg'
              alt=''
              aria-hidden="true"
              width={48}
              height={48}
              className={styles.icone}
            />
            <h3>Suivez votre progression</h3>
            <p>
              Comparez vos scores dans le temps et mesurez l'impact de chaque correction.
            </p>
          </li>
        </ol>
      </section>
 
      {/* ── Pourquoi rendre accessible ── */}
      <section className={styles.sliceWhy}>
        <h2>Pourquoi rendre accessible votre site aux normes RGAA ?</h2>
        <ul className={styles.whyGrid}>
          <li>
            <h3>106 critères RGAA 4.1 officiels</h3>
            <p>
              Nos tests sont basés sur le référentiel officiel publié par l'État français
              (DINUM), couvrant les niveaux A, AA et AAA.
            </p>
          </li>
          <li>
            <h3>Score pondéré intelligent</h3>
            <p>
              Pondération par importance (A x3, AA x2, AAA x1) pour prioriser les
              corrections à fort impact.
            </p>
          </li>
          <li>
            <h3>Rapport PDF professionnel</h3>
            <p>
              Export PDF complet avec détails par thématique, code source incriminé et
              suggestions de correction.
            </p>
          </li>
          <li>
            <h3>Dashboard collaboratif</h3>
            <p>
              Centralisez les audits de votre équipe.
              Historique complet, scores et suivi de progression.
            </p>
          </li>
          <li>
            <h3>Données sécurisées</h3>
            <p>
              Vos audits sont stockés de façon sécurisée avec Supabase.
              Aucune donnée n'est partagée avec des tiers.
            </p>
          </li>
          <li>
            <h3>Analyse instantanée</h3>
            <p>
              Résultats en quelques secondes directement dans votre navigateur.
              Zéro configuration requise.
            </p>
          </li>
        </ul>
      </section>
 
      {/* ── FAQ ── */}
      <section className={styles.sliceFaq}>
        <h2>Questions fréquentes</h2>
        <dl className={styles.faqList}>
          <dt>Qu'est-ce que le RGAA 4.1 ?</dt>
          <dd>
            Le Référentiel Général d'Amélioration de l'Accessibilité (RGAA) est le standard officiel
            français pour l'accessibilité numérique, publié par la DINUM. Basé sur les WCAG 2.1 du W3C,
            il comprend 106 critères répartis en 13 thématiques. Il est obligatoire pour les services
            publics et recommandé pour le secteur privé.
          </dd>
          <dt>Les critères sont-ils fiables ?</dt>
          <dd>
            Nos 106 tests sont directement basés sur le référentiel officiel publié sur
            accessibilite.numerique.gouv.fr. Chaque critère est référencé par son numéro officiel
            (ex : 1.1, 3.1) et classé par niveau de conformité (A, AA, AAA).
          </dd>
          <dt>L'extension Chrome est-elle gratuite ?</dt>
          <dd>
            Oui, vous pouvez réaliser 5 audits par mois gratuitement avec l'extension Chrome.
            Pour un usage illimité, l'export PDF/CSV et le détail complet des corrections,
            consultez nos offres Pro et Équipe.
          </dd>
          <dt>Quelles données sont collectées ?</dt>
          <dd>
            Seuls les résultats de l'audit (score, erreurs, URL) sont stockés sur votre compte.
            Aucune donnée personnelle ni contenu de vos pages n'est collecté ou transmis à des tiers.
            Vos données restent hébergées en Europe.
          </dd>
          <dt>Puis-je monitorer mon site complet ?</dt>
          <dd>
            Oui, le plan Max permet de monitorer toutes les pages de votre site avec des analyses
            récurrentes quotidiennes, un score global et des alertes de régression en cas de baisse
            en dessous d'un seuil configurable.
          </dd>
        </dl>
      </section>
 
    </>
  );
}
 
export default Home;