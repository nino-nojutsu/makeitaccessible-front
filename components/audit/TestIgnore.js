import { useState } from "react";
import styles from "../../styles/Test.module.css";
import { Input } from "antd";

function TestIgnore(props) {
  /** state **/

  /** comportement **/
  const { TextArea } = Input;

  /** affichage **/
  return (
    <>
      <h3>Ignorer l'anomalie</h3>
      <TextArea
        rows={8}
        cols={12}
        placeholder="Veuillez renseigner la raison d'ignorer cette anomalie"
        aria-label="Veuillez renseigner la raison d'ignorer cette anomalie"
        maxLength={300}
        onChange={(e) => props.handleCommentValue(e.target.value)}
      />
    </>
  );
}

export default TestIgnore;
