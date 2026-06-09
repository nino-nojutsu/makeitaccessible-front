import styles from '../../styles/Tests.module.css';

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: 'Critique',
  serious:  'Majeur',
  moderate: 'Modéré',
  minor:    'Mineur',
}

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({ status, description, impact, tags, nodes }) {
  /** comportements **/
  // console.log('tags', tags);

  // Affichage du numéro de la règle RGAA
  //
  // Recherche tout ce qui commence par RGAA- (^... operator : commence par)
  const rgaaFound = /^RGAA-/;
  const rgaaTag = tags.find(tag => rgaaFound.test(tag));

  // Recherche tout sauf RGAA- ([^...] not operator) suivi de 1 ou plusieurs caractères pour ignore RGAA- et extraire uniquement les numéro 1.1.1
  const rgaaNumberFound = /[^RGAA-]+/;
  const rgaaTabNumer = rgaaTag.match(rgaaNumberFound)

  // Affichage du nombre d'occurences (c'est à dire le nombre d'éléments html concernés par le test remonté)
  const totalNodes = nodes.length;

  /** affichage **/
  return (
    <div className={`${styles.testTile} ${styles.status} ${styles[`status-${status}`]} ${styles[`impact-${impact}`]}`}>
      <div className={styles.rgaaTagTest}>
        {rgaaTabNumer}
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
          <button className="button-action">Détails</button>
        </span>
      </div>
    </div>
  );
}

export default Test;
