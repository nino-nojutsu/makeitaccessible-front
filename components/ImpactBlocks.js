import styles from "../styles/ImpactBlocks.module.css";

function ImpactBlocks(props) {
  const impactLabelCount = {
    critiques: 0,
    majeurs: 0,
    moderes: 0,
    mineurs: 0,
    nonTestables: 0,
  };
  const sepCriticalList = [];
  const sepSeriousList = [];
  const sepModerateList = [];
  const sepMinorList = [];
  let styleSep = { 'backgroundColor': '#111827' }

  props.tests?.forEach((rule) => {
    // console.log("rule", rule);

    // Violations regroupées par niveau d'importance
    const totalRulesType = [
      ...rule.violations,
      ...rule.incomplete,
      ...rule.passes,
    ];
    // console.log('totalRulesType', totalRulesType);

    totalRulesType.forEach((item, index) => {
      if (item.impact === "critical") {
        styleSep = { 'backgroundColor': '#d30000' }
        impactLabelCount.critiques++;
        sepCriticalList.push(<span key={impactLabelCount.critiques} style={styleSep}></span>);
      }
      if (item.impact === "serious") {
        styleSep = { 'backgroundColor': '#fc5a5a' }
        impactLabelCount.majeurs++;
        sepSeriousList.push(<span key={impactLabelCount.majeurs} style={styleSep}></span>);
      }
      if (item.impact === "moderate") {
        styleSep = { 'backgroundColor': '#ff7b00' }
        impactLabelCount.moderes++;
        sepModerateList.push(<span key={impactLabelCount.moderes} style={styleSep}></span>);
      }
      if (item.impact === "minor") {
        styleSep = { 'backgroundColor': '#d9b206' }
        impactLabelCount.mineurs++;
        sepMinorList.push(<span key={impactLabelCount.mineurs} style={styleSep}></span>);
      }
    });
  });

  return (
    <div className={styles.impactContainer}>
      <div className={`${styles.impactBlock} ${styles.critical}`}>
        <span className={styles.impactCriticity}>critiques</span>

        <strong className={styles.impactCounter}>
          {impactLabelCount.critiques}
          <span className={styles.impactText}>anomalie(s)</span>
        </strong>
        <span className={styles.sepList}>
          {sepCriticalList}
        </span>
      </div>

      <div className={`${styles.impactBlock} ${styles.serious}`}>
        <span className={styles.impactCriticity}>majeurs</span>

        <strong className={styles.impactCounter}>
          {impactLabelCount.majeurs}
          <span className={styles.impactText}>anomalie(s)</span>
        </strong>

        <span className={styles.sepList}>
          {sepSeriousList}
        </span>
      </div>

      <div className={`${styles.impactBlock} ${styles.moderate}`}>
        <span className={styles.impactCriticity}>Modérés</span>

        <strong className={styles.impactCounter}>
          {impactLabelCount.moderes}
          <span className={styles.impactText}>anomalie(s)</span>
          {sepCriticalList}
        </strong>

        <span className={styles.sepList}>
          {sepModerateList}
        </span>
      </div>

      <div className={`${styles.impactBlock} ${styles.minor}`}>
        <span className={styles.impactCriticity}>mineurs</span>
        
        <strong className={styles.impactCounter}>
          {impactLabelCount.mineurs}
          <span className={styles.impactText}>anomalie(s)</span>
          {sepCriticalList}
        </strong>

        <span className={styles.sepList}>
          {sepMinorList}
        </span>
      </div>
    </div>
  );
}
export default ImpactBlocks;
