import styles from "../../styles/Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
import { loadAudit } from "../../reducers/audit";
import API_BASE_URL from "../../utils/api";

function SignUp({ closeModal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const audit = useSelector((store) => store.audit.value);

  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

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

  const handleRegister = (event) => {
    event.preventDefault();

    fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        username: signUpUsername,
        password: signUpPassword,
        auditId: audit?.results?._id,
        websiteId: audit?.website?._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              token: data.token,
              username: signUpUsername,
              firstName: signUpFirstName,
            }),
          );

          setSignUpLastName("");
          setSignUpFirstName("");
          setSignUpEmail("");
          setSignUpUsername("");
          setSignUpPassword("");

          if (data.auditId) {
            loadUserAudit(data.auditId);
          }

          closeModal?.();

          if (router.pathname !== "/audit") {
            router.push("/dashboard");
          }
        } else {
          alert(data.error || "Inscription impossible");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form
      onSubmit={handleRegister}
      className={styles.formSignUp}
      role="register"
      aria-label="Creer un compte"
    >
      <label htmlFor="signUpLastname">Nom*</label>
      <input
        id="signUpLastname"
        type="text"
        placeholder="Entrez votre nom"
        onChange={(e) => setSignUpLastName(e.target.value)}
        value={signUpLastName}
        className={styles.inputSignUp}
        autoComplete="family-name"
        required
      />

      <label htmlFor="signUpFirstname">Prenom*</label>
      <input
        id="signUpFirstname"
        type="text"
        placeholder="Entrez votre prenom"
        onChange={(e) => setSignUpFirstName(e.target.value)}
        value={signUpFirstName}
        className={styles.inputSignUp}
        autoComplete="given-name"
        required
      />

      <label htmlFor="signUpEmail">Email*</label>
      <input
        id="signUpEmail"
        type="email"
        placeholder="Entrez votre email"
        onChange={(e) => setSignUpEmail(e.target.value)}
        value={signUpEmail}
        className={styles.inputSignUp}
        autoComplete="email"
        required
      />

      <label htmlFor="signUpUsername">Nom d'utilisateur*</label>
      <input
        id="signUpUsername"
        type="text"
        placeholder="Entrez votre nom d'utilisateur"
        onChange={(e) => setSignUpUsername(e.target.value)}
        value={signUpUsername}
        className={styles.inputSignUp}
        autoComplete="username"
        required
      />

      <label htmlFor="signUpPassword">Mot de passe*</label>
      <input
        id="signUpPassword"
        type="password"
        placeholder="Entrez votre mot de passe"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
        className={styles.inputSignUp}
        autoComplete="new-password"
        required
      />

      <button type="submit" className={styles.btnSubmitSignUp}>
        S'inscrire
      </button>
    </form>
  );
}

export default SignUp;
