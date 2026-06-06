import styles from '../../styles/Test.module.css';
import { useState } from "react";
import Test from './Test.js';

// Tests reçoit une catégorie et ses règles axe-core filtrées par type (rules)
// Affiche le titre de la catégorie + la liste des règles (liste composants Test)
function Tests({ category, rules }) {
  const testsList = rules.map((test, i) => {
    return <Test key={i} {...test} />
  })
  /** affichage **/
  return (
    <>
      <h5>{category}</h5>
      <div className={styles.testsListTile}>
        {testsList.length > 0 && testsList}
      </div>
    </>
  );
}

export default Tests;
