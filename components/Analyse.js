// Composant Analyse => affiche URL et envoi la demande d'audit au serveur

import { useState } from 'react';
import styles from '../styles/Home.module.css';

function Analyse() {

// stocke l'URL saisie par l'utilisateur
  const [url, setUrl] = useState('');

  // Met à jour l'état à chaque lancement d'analyse
  const handleInputChange = (targetUrl) => {
      setUrl(targetUrl);
  };

  // Envoi de l'URL au backend pour lancer l'analyse
  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
       .then((response) => response.json())
       .then((data) => {
         console.log("data", data);
       })
       .catch((error) => console.error(error));
  };

  return (
    <div>
      <form className={styles.mainAnalyse}  role="search" aria-label="Tester d'accessibilité">
        <input className={styles.search} id="url-input" name="url" type="url" aria-required="true" placeholder="Url de votre site internet..." value={url} onChange={(e) => handleInputChange(e.target.value)} />
        <button className={styles.ctaSearch} onClick={handleSubmit} type="submit"> Analyser mon site → </button>
      </form>
    </div>
  );
}

export default Analyse;