import styles from "../../styles/Audit.module.css";
import headerStyles from "../../styles/Header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Analyse from '../Analyse';
import Score from './Score';
import { Modal } from "antd";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function HeroAudit() {
  const user = useSelector((state) => state.user.value);
  const audit = useSelector((state) => state.audit.value);
  console.log('audit', audit);

  // ouvrir/fermer les modales
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  // fermeture
  const handleCancelSignIn = () => setSignIn(false);
  const handleCancelSignUp = () => setSignUp(false);


  return (
    <section className={styles.analyseHero} aria-label="Relancer un audit et voir le score global de mon audit">

      {/* Barre de recherche => appel composant analyse */}
      <div className={styles.analyseWrapper}>
        <Analyse />
      </div>

      {/* Carte score global */}
      <div className={styles.scoreCard} aria-label="Score global et export">
        <Score />
        <section className={styles.centerSection}>
          <time className={styles.date}>
            Audit du {new Date(audit?.results?.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })} • {new Date(audit?.results?.createdAt).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </time>
          <p className={styles.url} aria-label={`Site audité : ${audit.results.url}`}>{audit.results.url}</p>
          {user.token && <button className={styles.auditButton} type="button">Voir audit complet</button>}
                          <div className={styles.tooltip} aria-label="En savoir plus sur le score" type="button">
                    <FontAwesomeIcon icon={faCircleInfo} aria-hidden="true" />
                    <p className={styles.tooltipText} role="tooltip">l'audit ne porte jamais sur toutes les pages d'un site, mais sur un échantillon représentatif de 15 à 20 pages minimum (plus sur les sites complexes). Pour des sites plus volumineux/complexes, on monte à un échantillon de 40 à 80 pages.</p>
                </div>
        </section>

        {user.token ? (
          <section aria-label="Options d'export" className={styles.download}>
            <button className={styles.downloadPDF} type="button">
              <svg
                width={20}
                height={20}
                aria-hidden="true"
                viewBox="0 0 186 196"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M61.3413 17.0958H22.3059C19.2389 17.0958 16.7295 19.6602 16.7295 22.7944V159.561C16.7295 162.695 19.2389 165.259 22.3059 165.259H50.1884V182.355H22.3059C10.0028 182.355 0 172.133 0 159.561V22.7944C0 10.2219 10.0028 0 22.3059 0H68.8347C74.7598 0 80.4408 2.38629 84.6232 6.66024L127.318 50.3258C131.501 54.5997 133.836 60.4052 133.836 66.4599V119.706H117.106V74.1174H86.4355C72.564 74.1174 61.3413 62.649 61.3413 48.4737V17.1314V17.0958ZM110.17 56.986L78.0708 24.1834V48.4381C78.0708 53.1751 81.8001 56.986 86.4355 56.986H110.17ZM72.4943 135.342H83.6473C95.1836 135.342 104.559 144.923 104.559 156.711C104.559 168.5 95.1836 178.081 83.6473 178.081H79.4649V188.054C79.4649 191.972 76.3281 195.177 72.4943 195.177C68.6605 195.177 65.5237 191.972 65.5237 188.054V142.465C65.5237 138.547 68.6605 135.342 72.4943 135.342ZM83.6473 163.835C87.4811 163.835 90.6179 160.629 90.6179 156.711C90.6179 152.794 87.4811 149.588 83.6473 149.588H79.4649V163.835H83.6473ZM117.106 135.342H128.259C138.262 135.342 146.383 143.64 146.383 153.862V176.657C146.383 186.878 138.262 195.177 128.259 195.177H117.106C113.272 195.177 110.136 191.972 110.136 188.054V142.465C110.136 138.547 113.272 135.342 117.106 135.342ZM128.259 180.931C130.559 180.931 132.442 179.007 132.442 176.657V153.862C132.442 151.512 130.559 149.588 128.259 149.588H124.077V180.931H128.259ZM154.747 142.465C154.747 138.547 157.884 135.342 161.718 135.342H178.448C182.281 135.342 185.418 138.547 185.418 142.465C185.418 146.383 182.281 149.588 178.448 149.588H168.689V158.136H178.448C182.281 158.136 185.418 161.342 185.418 165.259C185.418 169.177 182.281 172.383 178.448 172.383H168.689V188.054C168.689 191.972 165.552 195.177 161.718 195.177C157.884 195.177 154.747 191.972 154.747 188.054V142.465Z" fill="currentColor" />
              </svg>
              Télécharger au format PDF
            </button>
            <p>— OU —</p>
            <button className={styles.downloadCSV} type="button">
              <svg
                width={20}
                height={20}
                aria-hidden="true"
                viewBox="0 0 92 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M38.9633 61.5172C34.8822 61.5172 31.5737 64.7064 31.5737 68.6403V81.5913C31.5737 85.5251 34.8822 88.7143 38.9633 88.7143H41.6504C45.7315 88.7143 49.04 85.5251 49.04 81.5913V80.2962C49.04 78.5154 47.5285 77.0584 45.6811 77.0584C43.8337 77.0584 42.3222 78.5154 42.3222 80.2962V81.5913C42.3222 81.9474 42.0199 82.2388 41.6504 82.2388H38.9633C38.5938 82.2388 38.2915 81.9474 38.2915 81.5913V68.6403C38.2915 68.2841 38.5938 67.9927 38.9633 67.9927H41.6504C42.0199 67.9927 42.3222 68.2841 42.3222 68.6403V69.9354C42.3222 71.7161 43.8337 73.1731 45.6811 73.1731C47.5285 73.1731 49.04 71.7161 49.04 69.9354V68.6403C49.04 64.7064 45.7315 61.5172 41.6504 61.5172H38.9633ZM61.8037 61.5172C56.9837 61.5172 53.0706 65.2892 53.0706 69.9354C53.0706 74.5815 56.9837 78.3535 61.8037 78.3535C62.9122 78.3535 63.8191 79.2277 63.8191 80.2962C63.8191 81.3646 62.9122 82.2388 61.8037 82.2388H56.4295C54.5821 82.2388 53.0706 83.6958 53.0706 85.4765C53.0706 87.2573 54.5821 88.7143 56.4295 88.7143H61.8037C66.6238 88.7143 70.5369 84.9423 70.5369 80.2962C70.5369 75.65 66.6238 71.878 61.8037 71.878C60.6953 71.878 59.7884 71.0038 59.7884 69.9354C59.7884 68.8669 60.6953 67.9927 61.8037 67.9927H65.8344C67.6818 67.9927 69.1933 66.5357 69.1933 64.755C69.1933 62.9742 67.6818 61.5172 65.8344 61.5172H61.8037ZM77.9264 61.5172C76.079 61.5172 74.5675 62.9742 74.5675 64.755V69.8706C74.5675 75.6176 76.3309 81.2513 79.6394 86.027L80.496 87.2735C81.1174 88.1801 82.1754 88.7143 83.2838 88.7143C84.3923 88.7143 85.4503 88.1801 86.0717 87.2735L86.9282 86.027C90.2367 81.2351 92.0002 75.6176 92.0002 69.8706V64.755C92.0002 62.9742 90.4887 61.5172 88.6413 61.5172C86.7939 61.5172 85.2824 62.9742 85.2824 64.755V69.8706C85.2824 73.0436 84.5938 76.168 83.267 79.0496C81.9403 76.168 81.2517 73.0436 81.2517 69.8706V64.755C81.2517 62.9742 79.7402 61.5172 77.8928 61.5172H77.9264Z" fill="currentColor" />
                <path d="M32.869 9.92093H15.2059C13.8181 9.92093 12.6827 11.0394 12.6827 12.4065V72.0595C12.6827 73.4266 13.8181 74.5451 15.2059 74.5451H27.8224V82.0017H15.2059C9.63894 82.0017 5.11279 77.5433 5.11279 72.0595V12.4065C5.11279 6.92274 9.63894 2.46429 15.2059 2.46429H36.2596C38.9406 2.46429 41.5112 3.50512 43.4037 5.36927L62.7226 24.4148C64.6151 26.2789 65.6717 28.8111 65.6717 31.4519V54.6762H58.1018V34.7919H44.2237C37.9471 34.7919 32.869 29.7897 32.869 23.607V9.93646V9.92093ZM54.9635 27.3197L40.4388 13.0123V23.5914C40.4388 25.6576 42.1263 27.3197 44.2237 27.3197H54.9635Z" fill="currentColor" />
              </svg>
              Télécharger au format CSV
            </button>
          </section>
        ) : (
          // Non connecté
          <section aria-label="Connexion ou inscription" className={styles.download}>
            <p>Vous souhaitez exporter votre projet ?</p>
            <button type="button" aria-haspopup="dialog" aria-controls="modal-signin" aria-expanded={signIn} className={headerStyles.btnConnected} onClick={() => setSignIn(true)}>
              Se connecter
            </button>
            <p>Vous n’avez pas encore encore de compte ?</p>
            <button type="button" aria-haspopup="dialog" aria-controls="modal-signup" aria-expanded={signUp} className={headerStyles.btnRegistration} onClick={() => setSignUp(true)}>
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