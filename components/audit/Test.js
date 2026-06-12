import styles from '../../styles/Tests.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Modal } from 'antd';

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
  
  const [modalComment, setModalComment] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [comment, setComment] = useState('');

  const openRemoveModal = () => {
    setModalRemove(true);
  };

  const openCommentModal = () => {
    setModalComment(true);
  };

  const handleCancelRemove = () => {
    setModalRemove(false);
  };

  const handleCancelComment = () => {
    setModalComment(false);
  };

   const handleCommentSubmit = async () => {
    await fetch(`/commented/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comments: comment })
  });

  setModalComment(false);
  setComment('');
 };

 const handleRemoveSubmit = async () => {
  await fetch(`/removed/${id}`, {
    method: "PUT"
  });
  
  setModalRemove(false);
  
  window.location.reload();
 }

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
        <FontAwesomeIcon icon={faComment} onClick={openCommentModal} className={styles.icon} />
        <FontAwesomeIcon icon={faTrashAlt} onClick={openRemoveModal} className={styles.icon} />

        

        <Modal open={modalRemove} onCancel={handleCancelRemove} footer={null}>
          <h2>Retirer ce critère</h2>
          <input type="text" placeholder="Ecrivez le motif de votre retrait ici..." onChange={(e) => setComment(e.target.value)} value={comment} />
          <button onClick={handleCancelRemove}>Annuler</button>
          <button className="btn btn-danger" onClick={handleRemoveSubmit}>Valider</button>
        </Modal>

          <Modal open={modalComment} onCancel={handleCancelComment} footer={null}>
            <h2>Ecrire un commentaire</h2>
            <input type="text" placeholder="Détaillez et annoté ce critère" onChange={(e) => setComment(e.target.value)} value={comment} />
            <button className="btn btn-primary" onClick={handleCommentSubmit}>
              Valider
            </button>
            </Modal>
      </div>
    </div>
  );
}

export default Test;
