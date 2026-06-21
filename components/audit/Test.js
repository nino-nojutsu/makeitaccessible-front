import styles from "../../styles/Test.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateTest } from "../../reducers/audit";
import TestDetails from "./TestDetails.js";

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: "Critique",
  serious: "Majeur",
  moderate: "Modéré",
  minor: "Mineur",
};

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({ testId, type, ruleId, status, impact, tags, description, nodes, help, helpUrl, alert }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  /** state **/
  const [testDetailsModalVisible, setTestDetailsModalVisible] = useState(false);

  /** comportements **/
  const handleTestValidation = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/test/validate`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, testId, ruleId, type }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(validateTest(data.testDoc));
          setTestDetailsModalVisible(false);
        }
      });
  }
  // Affichage du numéro de la règle RGAA
  //
  // Recherche tout ce qui commence par RGAA- (^... operator : commence par)
  const rgaaFound = /^RGAA-/;
  const rgaaTag = tags.find((tag) => rgaaFound.test(tag));

  // Recherche tout sauf RGAA- ([^...] not operator) suivi de 1 ou plusieurs caractères pour ignore RGAA- et extraire uniquement les numéro 1.1.1
  const rgaaNumberFound = /[^RGAA-]+/;
  const rgaaTagNumber = rgaaTag.match(rgaaNumberFound);

  // Affichage du nombre d'occurences (c'est à dire le nombre d'éléments html concernés par le test remonté)
  const totalNodes = nodes.length;

  /** affichage **/
  return (
    <div
      className={`${styles.testTile} ${styles.alert} ${styles[`alert-${alert}`]} ${styles[`impact-${impact}`]}`}
    >
      <div className={styles.rgaaTagTest}>
        {rgaaTagNumber}
        <br />
        <span>RGAA</span>
      </div>

      <div className={styles.testContent}>
        <span className={styles.testStatus}>
          <span className={`badge badge-${impact === null ? "nc" : impact}`}>
            {impact === null ? "Impact non communiqué" : impactLabel[impact]}
          </span>
          {alert === 'success' &&
            <span className="badge badge-success">Validé</span>
          }
          <p>{description}.</p>
        </span>
        <span className={styles.testActions}>
          <span className={styles.totalNodesTest}>
            {totalNodes} élément(s) concerné(s)
          </span>
          <div className={styles.testActionsButtons}>
            {status !== 'validated' && 
              <button 
                className="button button-action" onClick={handleTestValidation}>
                <FontAwesomeIcon className={styles.faCircleCheck} aria-hidden="true" icon={faCheck} size="xs" /> Marquer comme résolu
              </button>
            } 
            <button 
              type="button"
              aria-controls="modal-test-details"
              aria-haspopup="dialog"
              aria-expanded={testDetailsModalVisible}
              className="button button-action" onClick={() => setTestDetailsModalVisible(true)}>
              Détails
            </button>
          </div>
        </span>
      </div>

      <Modal
        onCancel={() => setTestDetailsModalVisible(false)}
        open={testDetailsModalVisible}
        footer={[
          status !== 'validated' &&
          <Button key="submit" aria-label="Marquer comme résolu" type="primary" className="button button-success button-with-fa-icon" onClick={handleTestValidation}>
            <FontAwesomeIcon className={styles.faCircleCheck} aria-hidden="true" icon={faCheck} /> Marqué comme résolu
          </Button>,
          <Button key="back" aria-label="Fermer" onClick={() => setTestDetailsModalVisible(false)}>
            Fermer
          </Button>,
        ]}
        centered
        width={800}
      >
        <TestDetails
          alert={alert}
          impact={impact}
          tags={tags}
          description={description}
          nodes={nodes}
          help={help}
          helpUrl={helpUrl}
          impactLabel={impactLabel}
          rgaaTagNumber={rgaaTagNumber}
          totalNodes={totalNodes}
        />
      </Modal>
    </div>
  );
}

export default Test;
