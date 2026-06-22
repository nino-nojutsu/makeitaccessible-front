import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadAudit } from "../reducers/audit.js";
import homeStyles from "../styles/Home.module.css";
import dashboardStyles from "../styles/Dashboard.module.css";
import LoadingModal from "./modals/Loader.js";
import API_BASE_URL from "../utils/api.js";

function Analyse({ variant = "home", buttonLabel }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [modaleVisible, setModaleVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const styles = variant === "dashboard" ? dashboardStyles : homeStyles;

  const handleSubmit = (event) => {
    event.preventDefault();

    const urlCheck = /^https:\/\/.+\..+/;

    if (!url || !urlCheck.test(url)) {
      setError("L'URL doit commencer par https:// et contenir un domaine valide");
      return;
    }

    setError("");
    setModaleVisible(true);

    const siteDomain = url.match(/https?:\/\/(?:www\.)?([^.]+)\./);
    const siteName = url.match(/https?:\/\/(?:www\.)?([^/]+)/);

    fetch(`${API_BASE_URL}/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        name: siteName[1],
        domain: siteDomain[1],
        token: user?.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            loadAudit({
              website: data.website,
              results: data.results,
              tests: data.tests || [],
            }),
          );
          setModaleVisible(false);
          router.push("/audit");
        } else {
          setModaleVisible(false);
          setError(data.error || "L'audit a echoue, veuillez re-essayer plus tard");
        }
      })
      .catch((error) => {
        console.error(error);
        setModaleVisible(false);
        setError("Impossible de contacter le serveur, veuillez reessayer.");
      });
  };

  return (
    <>
      <form
        className={styles.mainAnalyse}
        onSubmit={handleSubmit}
        role="search"
        aria-label="Tester d'accessibilite"
      >
        <input
          className={styles.search}
          id="url-input"
          name="url"
          type="url"
          aria-required="true"
          placeholder="Url de votre site internet..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {error && (
          <div className="alert alert-error" role="alert">
            <FontAwesomeIcon
              aria-hidden="true"
              icon={faExclamationTriangle}
              size="sm"
            />
            {error}
          </div>
        )}

        <button className={styles.ctaSearch} type="submit">
          {buttonLabel ||
            (variant === "dashboard"
              ? "Effectuer mon premier audit"
              : "Analyser mon site ->")}
        </button>
      </form>

      <LoadingModal isVisible={modaleVisible} />
    </>
  );
}

export default Analyse;
