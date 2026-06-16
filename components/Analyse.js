/**
 ** Composant Analyse : le champ url est passé dans le body de la requête /audit en POST
 ** Récupère les résultats de l'audit si le backend a bien répondu (data.result à true)
 ** Enregistre les résultats de l'audit dans le store grace au reducer audit (grace à redux) 
 ** Le persisted store est enregistré dans le localStorage sous la cléf 'makeitaccessible' (grace à redux-persist)
 ** Redirige vers la page audit
 **/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadAudit } from "../reducers/audit.js";
import homeStyles from "../styles/Home.module.css";
import dashboardStyles from "../styles/Dashboard.module.css";
import LoadingModal from "./modals/Loader.js";

function Analyse({ variant = "home" }) {
  /** state **/
  // stocke l'URL saisie par l'utilisateur
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [modaleVisible, setModaleVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user.value);

  // Choix de la feuille de styles selon le contexte d'affichage
  const styles = variant === "dashboard" ? dashboardStyles : homeStyles;

  /** comportements **/
  // Met à jour l'état à chaque lancement d'analyse
  const handleInputChange = (targetUrl) => {
    setUrl(targetUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifie que l'URL commence par "https://" et contient au moins un point (ex: https://exemple.com)
    const urlCheck = /^https:\/\/.+\..+/;

    // !url = true si url est undefined, null
    // !urlCheck.test(url) = true si l'url ne correspond pas au format
    // .test() = méthode native RegExp, prend une string et retourne true/false selon si la regex matche ou pas
    if (!url || !urlCheck.test(url)) {
      setError("L'URL doit commencer par https:// et contenir un domaine valide");
      return;
    }

    setError("");
    // Ouvre la modale dès le submit
    setModaleVisible(true);

    // .match() = méthode native de String, prend une regex en paramètres et retourne un tableau de type String correspondants aux résultats du match

    // Extrait le nom de domaine principal (ex: "example" depuis "https://www.exemple.com")
    const siteDomain = url.match(/https?:\/\/(?:www\.)?([^.]+)\./);
    // Extrait le nom d'hôte complet sans le protocole ni le slash final (ex: "example.com" depuis "https://www.exemple.com/page")
    const siteName = url.match(/https?:\/\/(?:www\.)?([^/]+)/);

    // Envoie les informations du site au backend en webservice pour lancer l'analyse
    fetch(`${process.env.NEXT_PUBLIC_URL}/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Corps de la requête contenant l'URL saisie : nom et domain du site
      body: JSON.stringify({ url, name: siteName[1], domain: siteDomain[1], token: user?.token }),
    })
      // Conversion de la réponse du serveur au format JSON
      .then((response) => response.json())
      .then((data) => {
        // Si l'audit a été réalisé avec succès
        if (data.result) {
          // Finalisation de l'analyse et l'enregistrement dans le store
          // Charge les résultats de l'audit dans le store redux (reducer <audit>)
          dispatch(loadAudit({
            website: data.website,
            audit: data.audit
          }));
          setModaleVisible(false);
          router.push('/audit');
        } else {
          // Ferme la modale et affiche l'erreur
          setModaleVisible(false);
          setError(data.error || "L'audit a échoué, veuillez ré-essayer plus tard");
        }
      })
      .catch((error) => {
        console.error(error);
        // Ferme la modale et affiche un message d'erreur générique à l'utilisateur
        setModaleVisible(false);
        setError("Impossible de contacter le serveur, veuillez réessayer.");
      });
  }

  /** affichage **/
  return (
    <>
      <div>
        <form
          className={variant === "dashboard" ? styles.dashboardAnalyse : styles.mainAnalyse}
          onSubmit={handleSubmit}
          role="search"
          aria-label="Tester d'accessibilité"
        >
          <input
            className={variant === "dashboard" ? styles.inputAudit : styles.search}
            id="url-input"
            name="url"
            type="url"
            aria-required="true"
            placeholder="Url de votre site internet..."
            value={url}
            onChange={(e) => handleInputChange(e.target.value)}
          />

          {error &&
            <div className="alert alert-error" role="alert">
              <FontAwesomeIcon aria-hidden="true" icon={faExclamationTriangle} size="sm" />
              {error}
            </div>
          }

          <button className={variant === "dashboard" ? styles.button : styles.ctaSearch} type="submit">
            {variant === "dashboard" ? "Effectuer mon premier audit" : "Analyser mon site →"}
          </button>
        </form>
      </div>

      <LoadingModal isVisible={modaleVisible} />

    </>
  );
}

export default Analyse;