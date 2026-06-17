import styles from "../../styles/Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
import { loadAudit } from "../../reducers/audit";

function SignUp({ closeModal }) {
  const audit = useSelector((store) => store.audit.value);
  const router = useRouter();
  const dispatch = useDispatch();

  const [url, setUrl] = useState('');
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  useEffect(() => {
    setUrl(window.location);
  }, []);

  const handleRegister = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        username: signUpUsername,
        password: signUpPassword,
        auditId: audit.results._id,
        websiteId: website._id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username: signUpUsername, firstName: signUpFirstName}));

          setSignUpLastName("");
          setSignUpFirstName("");
          setSignUpEmail("");
          setSignUpUsername("");
          setSignUpPassword("");

          if (data.auditId) {
            // Va chercher l'audit lié à l'utilisateur pour afficher tous les résultats et les enregister dans le store redux (reducer <audit>)
            fetch(`${process.env.NEXT_PUBLIC_URL}/audit/${data.auditId}`)
              .then((response) => response.json())
              .then((data) => {
                if (data.result) {
                  // Enregistre dans le store redux (reducer <audit>), les données du website et de la totalité des résultats (results + tests) de l'audit retournés par le back
                  dispatch(loadAudit({
                    website: audit.website,
                    audit: data.audit
                  }));
                }
              }).catch((error) => console.error(error));
          }
          
          // Si nous ne sommes sur la page /audit => redirection vers le dashboard
          if (url.pathname !== '/audit') {
            router.push("/dashboard");
          }
          closeModal();
        }
      }).catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <label for="signUpLastname">Nom</label>
      <input
        id="signUpLastname"
        type="text"
        placeholder="Entrez votre nom"
        onChange={(e) => setSignUpLastName(e.target.value)}
        value={signUpLastName}
        className={styles.inputSignUp}
        autoComplete="on"
      />

      <label for="signUpFirstname">Prénom</label>
      <input
        id="signUpFirstname"
        type="text"
        placeholder="Entrez votre prénom"
        onChange={(e) => setSignUpFirstName(e.target.value)}
        value={signUpFirstName}
        className={styles.inputSignUp}
        autoComplete="on"
      />

      <label for="signUpEmail">Email</label>
      <input
        id="signUpEmail"
        type="email"
        placeholder="Entrez votre email"
        onChange={(e) => setSignUpEmail(e.target.value)}
        value={signUpEmail}
        className={styles.inputSignUp}
        autoComplete="on"
      />

      <label for="signUpUsername">Nom d'utilisateur</label>
      <input
        id="signUpUsername"
        type="text"
        placeholder="Entrez votre nom d'utilisateur"
        onChange={(e) => setSignUpUsername(e.target.value)}
        value={signUpUsername}
        className={styles.inputSignUp}
        autoComplete="on"
      />

      <label for="signUpPassword">Mot de passe</label>
      <input
        id="signUpPassword"
        type="password"
        placeholder="Entrez votre mot de passe"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
        className={styles.inputSignUp}
      />

      <button onClick={handleRegister} className={styles.btnSubmitSignUp}>
        S'inscrire
      </button>
    </>
  );
}

export default SignUp;
