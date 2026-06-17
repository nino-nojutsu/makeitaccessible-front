import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowPointer, faGear, faDownload, faChartLine } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Home.module.css';

function SliceModop() {

      return (

<section className={styles.sliceSteps}>
        <h2>Comment ça marche ?</h2>
        <p className={styles.description}>En 4 étapes simples, obtenez un audit complet de l'accessibilité de votre site.</p>
        <ol className={styles.stepsList}>
          <li className={styles.stepItem}>
             <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>01</span>
                <div className={styles.iconBox}>
                  <FontAwesomeIcon icon={faArrowPointer} className={styles.icon} />
                </div>
              </div>
            <h3>Lancez votre audit</h3>
            <p>
              Renseignez l'URL de votre site pour analyser la page active
              selon les 106 critères du référentiel officiel.
            </p>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>02</span>
                <div className={styles.iconBox}>
                  <FontAwesomeIcon icon={faGear} className={styles.icon} />
                </div>
              </div>
            <h3>Consultez les résultats</h3>
            <p>
              Score pondéré, erreurs par thématique, priorités de correction et suggestions détaillées.
            </p>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>03</span>
                <div className={styles.iconBox}>
                  <FontAwesomeIcon icon={faDownload} className={styles.icon} />
                </div>
              </div>
            <h3>Exportez le rapport</h3>
            <p>
              Téléchargez le rapport PDF ou CSV. Consultez l'historique sur votre tableau de bord.
            </p>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>04</span>
                <div className={styles.iconBox}>
                  <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
                </div>
              </div>
            <h3>Suivez votre progression</h3>
            <p>
              Comparez vos scores dans le temps et mesurez l'impact de chaque correction.
            </p>
          </li>
        </ol>
      </section>

      );
}
 
export default SliceModop;