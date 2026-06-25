import styles from "../../styles/Test.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faComment } from '@fortawesome/free-regular-svg-icons';
import { Modal, Button, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTest } from "../../reducers/audit";
import TestDetails from "./TestDetails.js";
import TestIgnore from "./TestIgnore.js";
import TestReview from "./TestReview.js";

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: "Critique",
  serious: "Majeur",
  moderate: "Modéré",
  minor: "Mineur",
};

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({ testId, type, ruleId, status, comment, impact, tags, description, nodes, help, helpUrl, alert }) {
  const user = useSelector((state) => state.user.value);
  const audit = useSelector((state) => state.audit.value);
  const dispatch = useDispatch();

  /** state **/
  const [testDetailsModalVisible, setTestDetailsModalVisible] = useState(false);
  const [testIgnoreModalVisible, setTestIgnoreModalVisible] = useState(false);
  const [testReviewModalVisible, setTestReviewModalVisible] = useState(false);
  const [commentIgnore, setCommentIgnore] = useState('');
  const [commentReview, setCommentReview] = useState('');

  /** comportements **/
  // Fonction déclenchée au click qui appelle PUT /ignore pour mettre à jour le status en 'validated' dans la rule du type concerné dans le testDoc en cours
  const handleTestValidation = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/test/validate`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, testId, ruleId, type }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(updateTest(data.testDoc));
          setTestDetailsModalVisible(false);
        }
      });
  }

  // Inverse Data Flow pour mettre à jour le state commentIgnore depuis la valeur récupérée dans le textarea géré depuis son enfant TestIgnore
  const handleCommentIgnoreValue = (comment) => {
    setCommentIgnore(comment);
  }

  // Fonction déclenchée au click qui appelle PUT /ignore pour mettre à jour le status en 'ignored' et ajouter le commentaire dans la rule du type concerné dans le testDoc en cours
  const handleSendTestIgnore = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/test/ignore`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, testId, ruleId, type, commentIgnore }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(updateTest(data.testDoc));
          setTestIgnoreModalVisible(false);
        }
      });
  }

  // Inverse Data Flow pour mettre à jour le state commentReview depuis la valeur récupérée dans le textarea géré depuis son enfant TestIgnore
  const handleCommentReviewValue = (comment) => {
    setCommentReview(comment);
  }

  // Fonction déclenchée au click qui appelle PUT /review pour mettre à jour le status en 'reviewed' et ajouter le commentaire dans la rule du type concerné dans le testDoc en cours
  const handleSendTestReview = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/test/review`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, testId, ruleId, type, commentReview }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(updateTest(data.testDoc));
          setTestReviewModalVisible(false);
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
    <div className={styles.testContainer}>
      <div className={`${styles.testTile} ${styles.alert} ${styles[`alert-${alert}`]} ${styles[`impact-${impact}`]}`}>
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
            {status === 'validated' &&
              <span className="badge badge-success">Validé</span>
            }
            {status === 'ignored' &&
              <span className="badge badge-default">Ignoré</span>
            }
            {status === 'reviewed' &&
              <span className="badge badge-secondary">Commenté</span>
            }
            <p>{description}.</p>
            {comment && 
              <p><em>“Commentaire : {comment}”</em></p>
            }
          </span>
          <span className={styles.testActions}>
            <span className={styles.totalNodesTest}>
              {totalNodes} élément(s) concerné(s)
            </span>
            <div className={styles.testActionsButtons}>
              {status !== 'validated' && status !== 'ignored' && status !== 'reviewed' &&
                <button 
                  className="button button-action" onClick={handleTestValidation}>
                  <FontAwesomeIcon aria-hidden="true" icon={faCheck} size="xs" /> Marquer comme résolu
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
            status !== 'validated' && status !== 'ignored' &&
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
      {status !== 'validated' && status !== 'ignored' && status !== 'reviewed' &&
        <>
          <button className="button button-link" onClick={() => setTestIgnoreModalVisible(true)}>
            <Tooltip title="Ignorer le test">
              <FontAwesomeIcon className={styles.ignoreButton} aria-label="Ignore le test" aria-hidden="true" icon={faCircleXmark} size="lg" />
            </Tooltip>
          </button>
        
          <Modal
            onCancel={() => setTestIgnoreModalVisible(false)}
            open={testIgnoreModalVisible}
            footer={[
              status !== 'validated' &&
              <Button key="submit" aria-label="Ignorer le test" type="primary" className="button button-success button-with-fa-icon" onClick={handleSendTestIgnore}>
                <FontAwesomeIcon className={styles.faCircleCheck} aria-hidden="true" icon={faCircleXmark} /> Ignorer le test
              </Button>,
              <Button key="back" aria-label="Fermer" onClick={() => setTestIgnoreModalVisible(false)}>
                Fermer
              </Button>,
            ]}
            centered
            width={800}
          >
            <TestIgnore handleCommentIgnoreValue={handleCommentIgnoreValue}  />
          </Modal>
        
          <button className="button button-link" onClick={() => setTestReviewModalVisible(true)}>
            <Tooltip title="Ecrire un commentaire">
              <FontAwesomeIcon className={styles.reviewButton} aria-label="Ecrire un commentaire" aria-hidden="true" icon={faComment} size="lg" />
            </Tooltip>
          </button>
        
          <Modal
            onCancel={() => setTestReviewModalVisible(false)}
            open={testReviewModalVisible}
            footer={[
              status !== 'validated' &&
              <Button key="submit" aria-label="Ecrire un commentaire" type="primary" className="button button-success button-with-fa-icon" onClick={handleSendTestReview}>
                <FontAwesomeIcon className={styles.faCircleCheck} aria-hidden="true" icon={faComment} /> Ecrire un commentaire
              </Button>,
              <Button key="back" aria-label="Fermer" onClick={() => setTestReviewModalVisible(false)}>
                Fermer
              </Button>,
            ]}
            centered
            width={800}
          >
            <TestReview handleCommentReviewValue={handleCommentReviewValue}  />
          </Modal>
        </>
      }
    </div>
  );
}

export default Test;
