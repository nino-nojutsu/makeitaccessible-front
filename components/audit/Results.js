import styles from "../../styles/Tests.module.css";
import Tests from "./Tests.js";

// Results embarque les 3 tableaux typés (violations, incomplete, passes filtrés en amont ou pas par catégorie depuis le composant Audit)
// selectedType va nous permettre d'afficher le type de tests filtrés et affichera la section correspondante selon le filtre du type sélectionné
function Results({ violations, incomplete, passes, selectedType, selectedImpact }) {
  // console.log('violations', violations);
  // console.log('selectedImpact', selectedImpact);

  /** comportements **/
  const violationsTestsList = violations?.length > 0 && violations.map((test, i) => {
    return <Tests key={i} category={test.category} rules={test.violations} selectedImpact={selectedImpact} status={'error'} />;
  });

  const incompleteTestsList = incomplete?.length > 0 && incomplete.map((test, i) => {
    return <Tests key={i} category={test.category} rules={test.incomplete} selectedImpact={selectedImpact} status={'warning'} />;
  });

  const passesTestsList = passes?.length > 0 && passes.map((test, i) => {
    return <Tests key={i} category={test.category} rules={test.passes} selectedImpact={selectedImpact} status={'success'} />;
  });

  /** affichage **/
  switch (selectedType) {
    case "violations":
      return (
        <>
          <h3>Anomalies</h3> 
          {violationsTestsList}
        </>
      )
      break;
    case "incomplete":
      return (
        <>
          <h3>Anomalies incomplètes</h3> 
          {incompleteTestsList}
        </>
      )
      break;
    case "passes":
      return (
        <>
          <h3>Validées</h3> 
          {passesTestsList}
        </>
      )
      break;
    default:
      return (
        <>
          {
            violations?.length > 0 && 
            <><h3>Anomalies</h3> {violationsTestsList}</>
          }

          {
            incomplete?.length > 0 &&
            <><h3>Anomalies incomplètes</h3> {incompleteTestsList}</>
          }

          {
            passes?.length > 0 &&
            <><h3>Validées</h3> {passesTestsList}</>
          }
        </>
      )
      break;
  }
}

export default Results;
