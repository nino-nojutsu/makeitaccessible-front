import styles from '../../styles/Rules.module.css';
import { useState } from "react";
import Test from './Test.js';

// Rules reçoit une catégorie et ses règles axe-core filtrées par type
// Affiche le titre de la catégorie + la liste des règles (liste de composants Test.js)
function Rules({ category, rules, selectedImpact, status, nodes }) {
  // console.log('status', status);
  // console.log('rules', rules);
  // console.log('selectedImpact', selectedImpact);

  // Filtre par impact si un impact est sélectionné (critical, major, minor)
  const filteredByImpact = selectedImpact !== 'all' ? rules.filter(rule => rule.impact === selectedImpact) : rules;
  const testsList = filteredByImpact.map((test, i) => {
    return <Test key={i} status={status} {...test} />
  });
  /** affichage **/
  return (
    <>
      { testsList.length > 0 &&
        <>
          <h4 className={styles.categoryRulesTitle}>Thématique — {category}</h4>
          {testsList}
        </>
      }
    </>
  );
}

export default Rules;
