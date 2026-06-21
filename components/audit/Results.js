import styles from "../../styles/Rules.module.css";
import Rules from "./Rules.js";

// Results embarque les 3 tableaux typés (violations, incomplete, passes filtrés en amont ou pas par catégorie depuis le composant Audit)
// On extrait uniquement les tableau violations/incomplete/passes de chaque testDoc pour le passer à Rules.
// selectedType va nous permettre d'afficher le type de Rules filtrés et affichera la section correspondante selon le type sélectionné dans le filtre
function Results({ violations, incomplete, passes, processed, selectedType, selectedImpact }) {
  /** comportements **/

  /* Groupe les rules par violations */
  const violationsRulesList = violations.length > 0 && violations.map((testDoc, i) => {
    const rules = [
      ...testDoc.violations.filter(rule => rule.status !== 'validated')
    ]
    return <Rules key={i} testId={testDoc._id} type="violations" category={testDoc.category} rules={rules} selectedImpact={selectedImpact} alert={'error'} />;
  });

  /* Groupe les rules par incomplete */
  const incompleteRulesList = incomplete.length > 0 && incomplete.map((testDoc, i) => {
    const rules = [
      ...testDoc.incomplete.filter(rule => rule.status !== 'validated')
    ]
    return <Rules key={i} testId={testDoc._id} type="incomplete" category={testDoc.category} rules={rules} selectedImpact={selectedImpact} alert={'warning'} />;
  });

  /* Groupe les rules par passes */
  const passesRulesList = passes.length > 0 && passes.map((testDoc, i) => {
    const rules = [
      ...testDoc.passes.filter(rule => rule.status !== 'validated')
    ]
    return <Rules key={i} testId={testDoc._id} type="passes" category={testDoc.category} rules={testDoc.passes} selectedImpact={selectedImpact} alert={'success'} />;
  });

  /* Groupe les rules traitées (validées) */
  const processedRulesList = processed.length > 0 && processed.map((testDoc, i) => {
    const rules = [
      ...testDoc.violations.filter(rule => rule.status === 'validated'),
      ...testDoc.incomplete.filter(rule => rule.status === 'validated')
    ];
    return <Rules key={i} testId={testDoc._id} type="processed" category={testDoc.category} rules={rules} selectedImpact={selectedImpact} alert={'success'} />;
  });

  /** affichage **/
  switch (selectedType) {
    case "processed": 
      return (
        <>
          <h3>Anomalies traitées</h3>
          {processedRulesList ? processedRulesList : 'Pas de résultats'}
        </>
      )
    case "violations":
      return (
        <>
          <h3>Anomalies</h3> 
          {violationsRulesList ? violationsRulesList : 'Pas de résultats'}
        </>
      )
      break;
    case "incomplete":
      return (
        <>
          <h3>Anomalies incomplètes</h3> 
          {incompleteRulesList ? incompleteRulesList : 'Pas de résultats'}
        </>
      )
      break;
    case "passes":
      return (
        <>
          <h3>Validées</h3> 
          {passesRulesList ? passesRulesList : 'Pas de résultats'}
        </>
      )
      break;
    default:
      return (
        <>
          {
            processed.length > 0 && 
            <><h3>Anomalies traitées</h3> {processedRulesList}</>
          }
          {
            violations.length > 0 && 
            <><h3>Anomalies</h3> {violationsRulesList}</>
          }

          {
            incomplete.length > 0 &&
            <><h3>Anomalies incomplètes</h3> {incompleteRulesList}</>
          }

          {
            passes.length > 0 &&
            <><h3>Validées</h3> {passesRulesList}</>
          }
        </>
      )
      break;
  }
}

export default Results;
