import styles from '../../styles/Test.module.css';
import { useState } from "react";

function Tests({category, test}) {
  /** affichage **/
  return (
    <>
      <h5>{category}</h5>
      <div className={styles.testTile}>
        <span>TEST COMPONENT</span>
      </div>
    </>
  );
}

export default Tests;
