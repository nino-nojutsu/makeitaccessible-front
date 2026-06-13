import styles from "../../styles/Audit.module.css";
import headerStyles from "../../styles/Header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Analyse from '../Analyse';
import Score from './Score';
import { Modal } from "antd";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";

function HeroAudit() {

  const audit = useSelector((state) => state.audit.value);
  const user = useSelector((state) => state.user.value);

  // ouvrir/fermer les modales
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  // fermeture
  const handleCancelSignIn = () => setSignIn(false);
  const handleCancelSignUp = () => setSignUp(false);


  return (
    <section className={styles.analyseHero} aria-label="Relancer un audit et voir score global de mon audit">

      {/* Barre de recherche => appel composant analyse */}
      <div className={styles.analyseWrapper}>
        <Analyse />
      </div>

      {/* Carte score global */}
      <div className={styles.scoreCard} aria-label="Score global et export">
        <Score />
        <section className={styles.centerSection}>
          <time className={styles.date}>
            Audit du {new Date(audit?.audit?.results?.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })} • {new Date(audit?.audit?.results?.createdAt).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </time>
          <p className={styles.url}  aria-label={`Site audité : ${audit.audit.results.url}`}>{audit.audit.results.url}</p>
          {user.token && <button className={styles.auditButton}  type="button">Voir audit complet</button>}
        </section>

        {user.token ? (
          <section  aria-label="Options d'export" className={styles.download}>
            <button className={styles.downloadPDF}  type="button">Télécharger au format PDF</button>
            <p>— OU —</p>
            <button className={styles.downloadCSV}  type="button">Télécharger au format CSV</button>
          </section>
        ) : (
          // Non connecté
          <section aria-label="Connexion ou inscription" className={styles.download}>
          <p>Vous souhaitez exporter votre projet ?</p>
            <button type="button" aria-haspopup="dialog" aria-expanded={signIn} className={headerStyles.btnConnected} onClick={() => setSignIn(true)}>
              Se connecter
            </button>
            <p>Vous n’avez pas encore encore de compte ?</p>
            <button  type="button" aria-haspopup="dialog" aria-expanded={signUp} className={headerStyles.btnRegistration} onClick={() => setSignUp(true)}>
              S'inscrire
            </button>
          </section>
        )}

        {/* Les modales restent toujours dans le DOM — elles s'ouvrent via open={signIn/signUp} */}
        <Modal
          title="Se connecter à votre compte"
          open={signIn}
          onCancel={() => setSignIn(false)}
          footer={null}
          className={headerStyles.modalesSignIn}
        >
          <SignIn closeModal={handleCancelSignIn} />
        </Modal>

        <Modal
          title="Créer votre compte"
          open={signUp}
          onCancel={() => setSignUp(false)}
          footer={null}
          className={headerStyles.modalesSignUp}
        >
          <SignUp closeModal={handleCancelSignUp} />
        </Modal>
      </div>
    </section>
  );
}

export default HeroAudit;