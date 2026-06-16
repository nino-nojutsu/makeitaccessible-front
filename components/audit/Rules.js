import styles from '../../styles/Rules.module.css';
import { useState } from "react";
import Test from './Test.js';

// Rules reçoit une catégorie et ses règles axe-core filtrées par type
// Affiche le titre de la catégorie + la liste des règles (liste de composants Test.js)

function Rules({ testId, category, rules, selectedImpact, status, nodes }) {
  // Filtre par impact si un impact est sélectionné (critical, major, minor)
  const filteredByImpact = selectedImpact !== 'all' ? rules.filter(rule => rule.impact === selectedImpact) : rules;

  const rulesList = filteredByImpact.map((rule, i) => {
    // console.log('rule', rule);
    // Composant Test d'une règle Axe-core => Cette règle Axe-core a t-elle passé le test
    return <Test key={i} testId={testId} status={status} {...rule} />
  });
  /** affichage **/
  return (
    <>
      { rulesList.length > 0 &&
        <>
          <h4 className={styles.categoryRulesTitle}>Thématique — {category}</h4>
          {rulesList}
        </>
      }
    </>
  );
}

export default Rules;
