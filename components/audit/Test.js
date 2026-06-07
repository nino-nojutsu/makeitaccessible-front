import styles from '../../styles/Tests.module.css';

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({description, help, impact, html, tags}) {
  /** affichage **/
  return (
    <div className={styles.testTile}>
      <p>{description}</p>
    </div>
  );
}

export default Test;
