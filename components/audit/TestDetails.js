import styles from "../../styles/Test.module.css";
import { useState } from "react";
import { Tabs } from 'antd';
import Node from "./Node.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

function TestDetails({ status, impact, tags, description, nodes, help, helpUrl, impactLabel, rgaaTagNumber, totalNodes }) {
  /** state **/

  /** comportement **/

  /** affichage **/
  return (
    <>
      <h3>Détails des anomalies</h3>

      <section className={styles.testInfos}>
        <span className={`badge badge-${impact === null ? "nc" : impact}`}>
          {impact === null ? "Impact non communiqué" : impactLabel[impact]}
        </span>
        <span className={styles.testRgaaNumber}>
          Critère RGAA - {rgaaTagNumber}
        </span>
      </section>

      <section className={styles.testAdvice}>
        <p>{help}</p>
      </section>

      <section className={styles.testAdviceBlock}>
        <h5><FontAwesomeIcon className={styles.iconBook} aria-hidden="true" icon={faBook} /> Nos conseils</h5>
        {description}
      </section>

      <section className={styles.tabsContainer}>
        <h4>{totalNodes} élément(s) HTML concerné(s)</h4>
        
        <Tabs
          className={styles.testTabsNodes}
          defaultActiveKey='1'
          tabPosition={'top'}
          items={nodes.map((node, i) => {
            const id = String(i + 1);
            return {
              label: `Anomalie ${id}. ${node.html}`,
              key: id,
              children: <Node key={i} id={id} {...node} />,
            };
          })}
        />
      </section>
    </>
  );
}

export default TestDetails;
