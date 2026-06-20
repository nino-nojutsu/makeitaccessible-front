import Image from "next/image";
import Analyse from "../Analyse";
import styles from "../../styles/Home.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEarDeaf,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";

function HeroHome() {
  return (
    <main className={styles.main}>
      {/* Hero - colonne gauche */}
      <section className={styles.heroLeft}>
        <p className={styles.subTitle}>Make It Accessible • Web App</p>
        <h1 className={styles.title}>
          Tous vos utilisateurs comptent, améliorez{" "}
          <span className={styles.highlight}>l'accessibilité</span> de votre
          site
        </h1>
        <p className={styles.description}>
          Un site qui réalise tous les tests d'accessibilité (RGAA 4.1) et
          renvoie <strong>un score</strong>, <strong>un rapport visuel</strong>{" "}
          et des <strong>recommandations priorisées</strong>. Pour les devs, PO,
          agences et auditeurs.
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
            <FontAwesomeIcon
              className={styles.featureIcon}
              aria-hidden="true"
              icon={faEye}
            />
            <div>
              <p className={styles.featureTitle}>Vue</p>
              <p className={styles.featureDescription}>
                Contrastes, alternatives textuelles, lecteurs d'écran
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <FontAwesomeIcon
              className={styles.featureIcon}
              aria-hidden="true"
              icon={faEarDeaf}
            />
            <div>
              <p className={styles.featureTitle}>Audition</p>
              <p className={styles.featureDescription}>
                Sous-titres, transcriptions, alertes visuelles
              </p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <FontAwesomeIcon
              className={styles.featureIcon}
              aria-hidden="true"
              icon={faKeyboard}
            />
            <div>
              <p className={styles.featureTitle}>Clavier</p>
              <p className={styles.featureDescription}>
                Navigation, focus, interactions sans souris
              </p>
            </div>
          </div>
        </div>
        <div className={styles.boxInfos}>
          <div className={styles.box}>
            <span className={styles.badgeLabel}>
              Notre outil d'analyse pour
            </span>
            <strong>
              Les devs, les PO, les chefs de projets, les auditeurs.
            </strong>
          </div>
          <div className={styles.box}>
            <span className={styles.badgeLabel}>Échéance</span>
            <strong>
              LaCapsule project
              <br />
              28 juin 2026
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HeroHome;
