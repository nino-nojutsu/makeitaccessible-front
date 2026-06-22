import styles from "../../styles/Rules.module.css";
import Rules from "./Rules.js";

// Results embarque les 3 tableaux typés (violations, incomplete, passes filtrés en amont ou pas par catégorie depuis le composant Audit)
// selectedType va nous permettre d'afficher le type de Rules filtrés et affichera la section correspondante selon le filtre du type sélectionné
function Results({ violations, incomplete, passes, processed, selectedType, selectedImpact }) {
  // console.log('violations', violations);
  // console.log('selectedImpact', selectedImpact);

  /** comportements **/
  const violationsRulesList = violations?.length > 0 && violations.map((testDoc, i) => {
    if (testDoc.status !== 'validated') {
      return <Rules key={i} testId={testDoc._id} testStatus={testDoc.status} category={testDoc.category} rules={testDoc.violations} selectedImpact={selectedImpact} alert={'error'} />;
    }
  });

  const incompleteRulesList = incomplete?.length > 0 && incomplete.map((testDoc, i) => {
    if (testDoc.status !== 'validated') {
      return <Rules key={i} testId={testDoc._id} testStatus={testDoc.status} category={testDoc.category} rules={testDoc.incomplete} selectedImpact={selectedImpact} alert={'warning'} />;
    }
  });

  const passesRulesList = passes?.length > 0 && passes.map((testDoc, i) => {
    return <Rules key={i} testId={testDoc._id} testStatus={testDoc.status} category={testDoc.category} rules={testDoc.passes} selectedImpact={selectedImpact} alert={'success'} />;
  });

  const processedRulesList = processed?.length > 0 && processed.map((testDoc, i) => {
    return <Rules key={i} testId={testDoc._id} testStatus={testDoc.status} category={testDoc.category} rules={testDoc.passes} selectedImpact={selectedImpact} alert={'success'} />;
  });

  /** affichage **/
  switch (selectedType) {
    case "processed": 
      return (
        <>
          <h3>Processed</h3>
          {}
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
            processed?.length > 0 && 
            <><h3>Anomalies traitées</h3> {processedRulesList}</>
          }
          {
            violations?.length > 0 && 
            <><h3>Anomalies</h3> {violationsRulesList}</>
          }

          {
            incomplete?.length > 0 &&
            <><h3>Anomalies incomplètes</h3> {incompleteRulesList}</>
          }

          {
            passes?.length > 0 &&
            <><h3>Validées</h3> {passesRulesList}</>
          }
        </>
      )
      break;
  }
}

export default Results;
