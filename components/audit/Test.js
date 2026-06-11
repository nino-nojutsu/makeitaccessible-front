import styles from '../../styles/Test.module.css';
import { Modal } from 'antd';
import TestDetails from './TestDetails.js';
import { useState } from 'react';

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: 'Critique',
  serious:  'Majeur',
  moderate: 'Modéré',
  minor:    'Mineur',
}

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({ status, description, impact, tags, nodes, html }) {
  // console.log('tags', tags);

  /** state **/
  const [testDetailsModalVisible, setTestDetailsModalVisible] = useState(false);

  /** comportements **/
  const showTestDetailsModal = () => {
    setTestDetailsModalVisible(true);
  };

  const handleCancelTestDetailsModal = () => {
    setTestDetailsModalVisible(false);
  };

  // Affichage du numéro de la règle RGAA
  //
  // Recherche tout ce qui commence par RGAA- (^... operator : commence par)
  const rgaaFound = /^RGAA-/;
  const rgaaTag = tags.find(tag => rgaaFound.test(tag));

  // Recherche tout sauf RGAA- ([^...] not operator) suivi de 1 ou plusieurs caractères pour ignore RGAA- et extraire uniquement les numéro 1.1.1
  const rgaaNumberFound = /[^RGAA-]+/;
  const rgaaTagNumber = rgaaTag.match(rgaaNumberFound)

  // Affichage du nombre d'occurences (c'est à dire le nombre d'éléments html concernés par le test remonté)
  const totalNodes = nodes.length;

  /** affichage **/
  return (
    <div className={`${styles.testTile} ${styles.status} ${styles[`status-${status}`]} ${styles[`impact-${impact}`]}`}>
      <div className={styles.rgaaTagTest}>
        {rgaaTagNumber}<br />
        <span>RGAA</span>
      </div>

      <div className={styles.testContent}>
        <span className={styles.testStatus}>
          {/*{status === 'success' &&
            <span className="badge badge-success">Validé</span>
          }*/}
          <span className={`badge badge-${impact === null ? 'nc' : impact}`}>
            {impact === null ? 'Impact non communiqué' : impactLabel[impact]}
          </span>
          <p>{description}.</p>
        </span>
        <span className={styles.testActions}>
          <span className={styles.totalNodesTest}>{totalNodes} élément(s) concerné(s)</span>
          <button className="button-action" onClick={showTestDetailsModal}>Détails</button>
        </span>
      </div>

      <Modal onCancel={() => handleCancelTestDetailsModal()} visible={testDetailsModalVisible} footer={null}>
        <TestDetails nodes={nodes} html={html} />
      </Modal>
    </div>
  );
}

export default Test;
