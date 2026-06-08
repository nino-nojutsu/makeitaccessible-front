import styles from '../../styles/Tests.module.css';
import { useState } from "react";
import Test from './Test.js';

// Tests reçoit une catégorie et ses règles axe-core filtrées par type (rules)
// Affiche le titre de la catégorie + la liste des règles (liste composants Test)
function Tests({ category, rules, selectedImpact, status }) {
  // console.log('status', status);
  // console.log('rules', rules);
  // console.log('selectedImpact', selectedImpact);

  const filteredByImpact = selectedImpact !== 'all' ? rules.filter(rule => rule.impact === selectedImpact) : rules;
  const testsList = filteredByImpact.map((test, i) => {
    return <Test key={i} status={status} {...test} />
  });
  /** affichage **/
  return (
    <>
      { testsList.length > 0 &&
        <>
          <h4 className={styles.testsListTitle}>Thématique — {category}</h4>
          <div className={styles.testsListTile}>
            {testsList}
          </div>
        </>
      }
    </>
  );
}

export default Tests;
