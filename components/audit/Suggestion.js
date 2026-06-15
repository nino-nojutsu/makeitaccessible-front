import styles from "../../styles/Test.module.css";

function Suggestion({ message }) {
  console.log('message', message);
  return (
    <div className={styles.suggestionContainer}>
      {message}.
    </div>
  );
}

export default Suggestion;