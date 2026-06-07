// import Link from 'next/link';
import styles from '../../styles/Categories.module.css';

function Category(props) {
  // console.log('props', props);
  // Inverse data flow : pattern React où un composant enfant remonte une action vers le parent via une prop fonction
  // Ici on a besoin, lors de l'event onClick sur Category de déclencher la fonction handleFilterByCat passée en props depuis le parent 
  // pour pourvoir mettre à jour le selectedCat seulement disponible dans Audit car seul Audit à accès aux données (audit.tests, selectedCat, displayTests)
  // Le composant enfant Category ne sais rien de ce qui se passe dans le composant parent Audit, il ne fait que déclencher un évenement
  
  /** comportements **/
  const handleClickCategory = () => {
    props.handleFilteredByCat(props.category);
  }

  /** affichage **/
  return (
    <li className={props.className} onClick={() => handleClickCategory()} disabled={props.hasInapplicable}>
      <span className={styles.category}>
        {props.category}
      </span>
      <em className={styles.bulletStatus}>
        {props.totalIssues > 0 &&
          <span className={`${styles.bulletIssue} ${styles.hasIssues}`}>
            {props.totalIssues}
          </span>
        }
        {props.totalPasses > 0 &&
          <span className={`${styles.bulletIssue} ${styles.hasNoIssues}`}>
            {props.totalPasses}
          </span>
        }
        {
          props.hasInapplicable && <small>Non applicable</small>
        }
      </em>
    </li>
  )
}

export default Category;