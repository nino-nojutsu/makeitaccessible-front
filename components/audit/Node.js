import styles from "../../styles/Test.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCircleQuestion, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import Suggestion from "./Suggestion.js";

function Node({ id, html, failureSummary, any, all }) {
  /** comportement **/
  const suggestions = [...any, ...all];
  const suggestionsList = suggestions.map(suggestion => {
    return <Suggestion data={suggestion.data} message={suggestion.message} />
  });

  console.log('suggestionsList', suggestionsList);

  /** affichage **/
  return (
    <div className={styles.nodeContainer}>
      <div className={styles.nodeHtml}>
        <h5>Élément HTML n°{id} à corriger : </h5>
        <div className={styles.nodeHtmlCode}>
          {html}
        </div>
      </div>
      <div className={styles.nodeFailureSummary}>
        <h5><FontAwesomeIcon aria-hidden="true" className={styles.iconInfoCircle} icon={faLightbulb} /> Appliquez les corrections suivantes : </h5>
        {failureSummary ? failureSummary : "Aucune information"}.
      </div>
      <div className={styles.nodeSuggestions}>
        <h5><FontAwesomeIcon aria-hidden="true" className={styles.iconInfoCircle} icon={faCircleQuestion} /> Mieux comprendre vos anomalies en suivant nos suggestions : </h5>
        <div className={styles.suggestionsList}>
          {suggestionsList}
        </div>
        <small><FontAwesomeIcon aria-hidden="true" className={styles.iconInfoCircle} icon={faInfoCircle} /> Appliquez l'une des suggestions de résolution çi-dessus, permettra de résoudre votre anomalie.</small>
      </div>
    </div>
  );
}

export default Node;