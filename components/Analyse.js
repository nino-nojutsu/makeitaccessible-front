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
  const [error, setError] = useState("");

  /** comportements **/
  // Met à jour l'état à chaque lancement d'analyse
  const handleInputChange = (targetUrl) => {
    setUrl(targetUrl);
  };

  // Envoi de l'URL au backend en webservice pour lancer l'analyse
  const handleSubmit = (event) => {
    event.preventDefault();

    const urlCheck = /^https:\/\/.+\..+/;

    // !url = true si url est undefined, null
    // !urlCheck.test(url) = true si l'url ne correspond pas au format
    // .test() = méthode native RegExp, prend une string et retourne true/false selon si la regex matche ou pas
    if (!url || !urlCheck.test(url)) {
      setError("L'URL doit commencer par https:// et contenir un domaine valide");
      return;
    }

    setError("");

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
        } else {
          setError(data.error || "L'audit a échoué, veuillez réessayer.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Impossible de contacter le serveur, veuillez réessayer.");
      });
    }

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
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.ctaSearch} type="submit">
            Analyser mon site →
          </button>
        </form>
      </div>
    );
  }

  export default Analyse;
