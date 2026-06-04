/**
 ** Composant Analyse : le champ url est passé dans le body de la requête /audit en POST
 ** Récupère les résultats de l'audit si le backend a bien répondu (data.result à true)
 ** Enregistre les résultats de l'audit dans le store grace au reducer audit (grace à redux) 
 ** Le persisted store est enregistré dans le localStorage sous la cléf 'makeitaccessible' (grace à redux-persist)
 ** Redirige vers la page audit
 **/

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Modal } from "antd";

function Analyse() {
  /** state **/
  // stocke l'URL saisie par l'utilisateur
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const [analyse, setAnalyse] = useState(false);

  const router = useRouter();

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

    // Envoie les informations du site au backend pour lancer l'audit
    fetch(`${process.env.NEXT_PUBLIC_URL}/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Corps de la requête contenant l'URL saisie : nom et domain du site
      body: JSON.stringify({ url, name: siteName[1], domain: siteDomain[1] }),
    })
      // Conversion de la réponse du serveur au format JSON
      .then((response) => response.json())
      .then((data) => {
        // Si l'audit a été réalisé avec succès
        if (data.result) {
          //ouvre le modale de chargement si analyse ok
          // finalisation de l'analyse et l'enregistrement dans le store
          setAnalyse(true);
          
          // Redirection vers la page de résultats après 2 secondes
          setTimeout(() => {
            router.push("/audit");
          }, 2000);
        } else {
          // Affiche le message d'erreur renvoyé par le backend
          setError(data.error || "L'audit a échoué, veuillez réessayer.");
        }
      })
      // Gestion des erreurs réseau ou serveur
      .catch((error) => {
        console.error(error);
        // Affiche un message d'erreur générique à l'utilisateur
        setError("Impossible de contacter le serveur, veuillez réessayer.");
      });
  }

  /** affichage **/
  return (
    <>
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

      <Modal
        open={analyse}
        footer={null}
        closable={false}
        maskClosable={false}
        centered
        width={400}
        className={styles.loadingModal}
      >
        <div style={{ textAlign: "center" }}>
          <p>Votre site est entre de bonnes mains 🙂</p>
          <p>En cours d’analyse...</p>

          <Image
            src='/images/illustration-recherche.png'
            alt='Analyse du site en cours'
            width={150}
            height={150}
             />
        </div>
      </Modal>
    </>
  );
}

export default Analyse;
