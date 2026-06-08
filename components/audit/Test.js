import styles from '../../styles/Tests.module.css';

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: 'Critique',
  serious:  'Majeur',
  moderate: 'Modéré',
  minor:    'Mineur',
}

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({ status, description, help, impact, html, tags }) {
  /** affichage **/
  return (
    <div className={`${styles.testTile} ${styles.status} ${styles[`status-${status}`]}`}>
      {status === 'success' &&
        <span className="badge badge-success">Validé</span>
      }
      <span className={`badge badge-${impact === null ? 'nc' : impact}`}>
        {impact === null ? 'Impact non communiqué' : impactLabel[impact]}
      </span>
      <p>{description}</p>
    </div>
  );
}

export default Test;
