import styles from '../../styles/Tests.module.css';

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: {
    label: 'Critique',
    badge: 'error'
  },
  serious: {
    label: 'Majeur',
    badge: 'warning'
  },
  moderate: {
    label: 'Modéré',
    badge: 'warning'
  },
  minor: {
    label: 'Mineur',
    badge: 'warning'
  },
}

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({description, help, impact, html, tags}) {
  /** affichage **/
  console.log('impactLabel[impact]', impactLabel[impact]);
  return (
    <div className={styles.testTile}>
      <span className="badge badge-error">{ impactLabel[impact]?.label }</span>
      <p>{description}</p>
    </div>
  );
}

export default Test;
