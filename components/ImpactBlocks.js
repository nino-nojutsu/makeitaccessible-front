import styles from "../styles/ImpactBlocks.module.css";

function ImpactBlocks(props) {

  const impactLabelCount = {
    Critiques: 0,
    Majeurs: 0,
    Mineurs: 0,
    Nontestables: 0,
  };

  // Violations regroupées par niveau d'importance
  props.violations?.forEach((categorie) => {

    categorie.violations?.forEach((violation) => {

      if (violation.impact === "critical") {
        impactLabelCount.Critiques = impactLabelCount.Critiques + 1
      }
      if (
        violation.impact === "serious" ||
        violation.impact === "moderate"
      ) {
        impactLabelCount.Majeurs++;
      }
      if (violation.impact === "minor") {
        impactLabelCount.Mineurs = impactLabelCount.Mineurs + 1
      }
    });
  });

  // Tests incomplets
  props.incomplete?.forEach((categorie) => {

    categorie.incomplete?.forEach(() => {
      impactLabelCount.Nontestables++;
    });

  });

  return (
    <div className={styles.impactContainer}>

      <div className={`${styles.impactBlock} ${styles.critical}`}>
        <span>Critiques</span>
        <strong>{impactLabelCount.Critiques}</strong>
      </div>

      <div className={`${styles.impactBlock} ${styles.serious}`}>
        <span>Majeurs</span>
        <strong>{impactLabelCount.Majeurs}</strong>
      </div>

      <div className={`${styles.impactBlock} ${styles.minor}`}>
        <span>Mineurs</span>
        <strong>{impactLabelCount.Mineurs}</strong>
      </div>

      <div className={`${styles.impactBlock} ${styles.incomplete}`}>
        <span>Non testables</span>
        <strong>{impactLabelCount.Nontestables}</strong>
      </div>

    </div>
  );
}
export default ImpactBlocks;