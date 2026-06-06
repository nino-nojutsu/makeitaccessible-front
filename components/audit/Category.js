// import Link from 'next/link';
import styles from '../../styles/Audit.module.css';

function Category(props) {
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
    <li>
      <span className={styles.category} onClick={() => handleClickCategory()}>
        {props.category}
      </span>
    </li>
  )
}

export default Category;