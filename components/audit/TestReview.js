import { useState } from "react";
import styles from "../../styles/Test.module.css";
import { Input } from "antd";

function TestReview(props) {
  /** state **/

  /** comportement **/
  const { TextArea } = Input;

  /** affichage **/
  return (
    <>
      <h3>Ecrire un commentaire</h3>
      <TextArea
        rows={8}
        cols={12}
        placeholder="Veuillez écrire un comment pertinent"
        aria-label="Veuillez écrire un comment pertinent"
        maxLength={300}
        onChange={(e) => props.handleCommentReviewValue(e.target.value)}
      />
    </>
  );
}

export default TestReview;
