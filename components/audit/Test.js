import styles from '../../styles/Test.module.css';

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({description, help, impact, html, tags}) {
  /** affichage **/
  return (
    <div className={styles.testTile}>
      {description}
    </div>
  );
}

export default Test;
