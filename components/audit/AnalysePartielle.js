import styles from "../../styles/Audit.module.css";
import headerStyles from "../../styles/Header.module.css";
import { Modal } from "antd";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";
import { useState } from "react";

function AnalysePartielle() {
  // ouvrir/fermer les modales
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  // fermeture
  const handleCancelSignIn = () => setSignIn(false);
  const handleCancelSignUp = () => setSignUp(false);

  return (
    <>
      <section
        aria-label="Accès à l'analyse complète"
        className={styles.mainAnalysePartielle}
      >
        <div>
          <h2>Vous souhaitez voir la suite de votre analyse ?</h2>
          <p>
            Connectez-vous pour accéder au détail complet : résultats par
            critère RGAA, par type (violations, éléments incomplets, validés) et
            par niveau de criticité !
          </p>
        </div>

        <section
          aria-label="Connexion ou inscription"
          className={styles.download}
        >
          <button
            type="button"
            aria-controls="modal-signin"
            aria-haspopup="dialog"
            aria-expanded={signIn}
            className={headerStyles.btnConnected}
            onClick={() => setSignIn(true)}
          >
            Se connecter
          </button>
          <p>Vous n’avez pas encore encore de compte ?</p>
          <button
            type="button"
            aria-controls="modal-signup"
            aria-haspopup="dialog"
            aria-expanded={signUp}
            className={headerStyles.btnRegistration}
            onClick={() => setSignUp(true)}
          >
            S'inscrire
          </button>
        </section>
      </section>

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
    </>
  );
}

export default AnalysePartielle;
