import styles from "../../styles/Test.module.css";
import Tests from "./Tests.js";

// Results embarque les 3 tableaux typés (violations, incomplete, passes filtrés en amont ou pas par catégorie depuis le composant Audit)
// selectedType va nous permettre d'afficher le type tests filtré et affichera la section correspondante au filtre de type sélectionné
function Results({ violations, incomplete, passes, selectedType }) {
  /** comportements **/
  const violationsTestsList = violations.map((test, i) => {
    return <Tests key={i} category={test.category} rules={test.violations} />;
  });

  const incompleteTestsList = incomplete.map((test, i) => {
    return <Tests key={i} category={test.category} rules={test.incomplete} />;
  });

  const passesTestsList = passes.map((test, i) => {
    return <Tests key={i} category={test.category} rules={test.passes} />;
  });

  /** affichage **/
  switch (selectedType) {
    case "violations":
      return (
        <>
          <h3>Anomalies</h3> {violationsTestsList}
        </>
      )
      break;
    case "incomplete":
      return (
        <>
          <h3>Anomalies incomplètes</h3> {incompleteTestsList}
        </>
      )
      break;
    case "passes":
      return (
        <>
          <h3>Validées</h3> {passesTestsList}
        </>
      )
      break;
    default:
      return (
        <>
          <h3>Anomalies</h3>
          {violationsTestsList}

          <h3>Anomalies incomplètes</h3>
          {incompleteTestsList}

          <h3>Validées</h3>
          {passesTestsList}
        </>
      )
      break;
  }
}

export default Results;
