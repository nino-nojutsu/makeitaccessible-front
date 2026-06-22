import styles from "../../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
import { loadAudit } from "../../reducers/audit";
import API_BASE_URL from "../../utils/api";

function SignIn({ closeModal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const audit = useSelector((store) => store.audit.value);

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState("");

  const loadUserAudit = (auditId) => {
    fetch(`${API_BASE_URL}/audit/${auditId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            loadAudit({
              website: audit.website,
              results: data.results,
              tests: data.tests || [],
            }),
          );
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    fetch(`${API_BASE_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
        websiteId: audit?.website?._id,
        auditId: audit?.results?._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              token: data.token,
              firstName: data.firstName,
              username: data.username || signInUsername,
            }),
          );

          setSignInUsername("");
          setSignInPassword("");

          if (data.auditId) {
            loadUserAudit(data.auditId);
          }

          closeModal?.();

          if (router.pathname !== "/audit") {
            router.push("/dashboard");
          }
        } else {
          setError(data.error || "Connexion impossible");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Impossible de contacter le serveur.");
      });
  };

  return (
    <>
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

      <form onSubmit={handleSubmit}>
        <label htmlFor="signInUsername">Nom d'utilisateur*</label>
        <input
          id="signInUsername"
          type="text"
          placeholder="Entrer votre nom d'utilisateur"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername}
          className={styles.inputSignIn}
          autoComplete="username"
          required
        />

        <label htmlFor="signInPassword">Mot de passe*</label>
        <input
          id="signInPassword"
          type="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
          className={styles.inputSignIn}
          autoComplete="current-password"
          required
        />

        <button type="submit" className={styles.btnSubmitSignIn}>
          Se connecter
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.href = `${API_BASE_URL}/auth/google`;
          }}
          className={styles.btnSubmitGoogleSignIn}
        >
          <Image
            src="/images/icon-google-connect.svg"
            alt="Se connecter avec Google"
            width={26}
            height={26}
          />
          Se connecter avec Google
        </button>
      </form>
    </>
  );
}

export default SignIn;
