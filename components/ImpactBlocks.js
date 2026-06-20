import styles from "../styles/ImpactBlocks.module.css";

function ImpactBlocks(props) {

  const impactLabelCount = {
    critiques: 0,
    majeurs: 0,
    mineurs: 0,
    nonTestables: 0,
  };

  // Violations regroupées par niveau d'importance
  props.violations?.forEach((categorie) => {

    categorie.violations?.forEach((violation) => {

      if (violation.impact === "critical") {
        impactLabelCount.critiques = impactLabelCount.critiques + 1
      }
      if (
        violation.impact === "serious" ||
        violation.impact === "moderate"
      ) {
        impactLabelCount.majeurs++;
      }
      if (violation.impact === "minor") {
        impactLabelCount.mineurs = impactLabelCount.mineurs + 1
      }
    });
  });

  // Tests incomplets
  props.incomplete?.forEach((categorie) => {

    categorie.incomplete?.forEach(() => {
      impactLabelCount.nonTestables++;
    });

  });

  return (
    <div className={styles.impactContainer}>

      <div className={`${styles.impactBlock} ${styles.critical}`}>
        <span>Critiques</span>
        <strong>{impactLabelCount.critiques}</strong>
      </div>

      <div className={`${styles.impactBlock} ${styles.serious}`}>
        <span>Majeurs</span>
        <strong>{impactLabelCount.majeurs}</strong>
      </div>

      <div className={`${styles.impactBlock} ${styles.minor}`}>
        <span>Mineurs</span>
        <strong>{impactLabelCount.mineurs}</strong>
      </div>

      <div className={`${styles.impactBlock} ${styles.incomplete}`}>
        <span>Non testables</span>
        <strong>{impactLabelCount.nonTestables}</strong>
      </div>

    </div>
  );
}
export default ImpactBlocks;