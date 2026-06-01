/**
 ** Composant Analyse : le champ url est passé dans le body de la requête /audit en POST
 ** Récupère les résultats de l'audit si le backend a bien répondu (data.result à true)
 ** Enregistre les résultats de l'audit dans le store grace au reducer audit (grace à redux) 
 ** Le persisted store est enregistré dans le localStorage sous la cléf 'makeitaccessible' (grace à redux-persist)
 ** Redirige vers la page audit
 **/

import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

function Analyse() {
  /** state **/
  // stocke l'URL saisie par l'utilisateur
  const [url, setUrl] = useState("");

  /** comportements **/
  // Met à jour l'état à chaque lancement d'analyse
  const handleInputChange = (targetUrl) => {
    setUrl(targetUrl);
  };

  // Envoi de l'URL au backend en webservice pour lancer l'analyse
  const handleSubmit = (event) => {
    event.preventDefault();
    // @nina todo: Open Modale + Loader

    const siteDomain = url.match(/https?:\/\/(?:www\.)?([^.]+)\./);
    const siteName = url.match(/https?:\/\/(?:www\.)?([^/]+)/);

    fetch(`${process.env.NEXT_PUBLIC_URL}/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, name: siteName[1], domain: siteDomain[1] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // @nina todo: Close Modale
          router.push("/audit");
        }
      })
      .catch((error) => console.error(error));
  };

  /** affichage **/
  return (
    <div>
      <form
        className={styles.mainAnalyse}
        onSubmit={handleSubmit}
        role="search"
        aria-label="Tester d'accessibilité"
      >
        <input
          className={styles.search}
          id="url-input"
          name="url"
          type="url"
          aria-required="true"
          placeholder="Url de votre site internet..."
          value={url}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button className={styles.ctaSearch} type="submit">
          Analyser mon site →
        </button>
      </form>
    </div>
  );
}

export default Analyse;
