import styles from '../../styles/Tests.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

// Impact de criticité (obligé de traduire car axe-core les envoie en anglais :/ alors que la locale est bien fr en back)
const impactLabel = {
  critical: 'Critique',
  serious:  'Majeur',
  moderate: 'Modéré',
  minor:    'Mineur',
}

// Test affiche une seule règle axe-core (description, impact, html, etc....)
function Test({ status, description, help, impact, html, tags, id }) {
  /** affichage **/

  const [retirerUnCritere, setRetirerUnCritere] = useState('');
  const [ajouterUnCommentaire, setAjouterUnCommentaire] = useState('');

   const handleSubmit = () => {
   
 };

  return (
    <div className={`${styles.testTile} ${styles.status} ${styles[`status-${status}`]}`}>
      {status === 'success' &&
        <span className="badge badge-success">Validé</span>
      }
      <span className={`badge badge-${impact === null ? 'nc' : impact}`}>
        {impact === null ? 'Impact non communiqué' : impactLabel[impact]}
      </span>
      <p>{description}</p>
      <div>
        <input type="checkbox" id={id} name={id} value={id} onChange={(e) => setRetirerUnCritere(e.target.value)} />
        <button className="btn btn-primary" onClick={() => setRetirerUnCritere(html)}>
          <FontAwesomeIcon icon="trash-alt" />
        </button>
        <div>
          <input type="text" id={`comment-${id}`} name={`comment-${id}`} value={ajouterUnCommentaire} onChange={(e) => setAjouterUnCommentaire(e.target.value)} />
          <button className="btn btn-primary" onClick={handleSubmit}>
            <FontAwesomeIcon icon="comment-dots" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
