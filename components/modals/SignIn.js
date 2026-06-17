import styles from "../../styles/Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
import { loadAudit } from "../../reducers/audit";

function SignIn({ closeModal }) {
  const [url, setUrl] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const audit = useSelector((store) => store.audit.value);

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  useEffect(() => {
    setUrl(window.location);
  }, []);

  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
        websiteId: audit.website._id,
        auditId: audit.results._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // On enregistre dans le store redux (reducer <users>) les infos du user : le token, le firstName et le username
          dispatch(login({ token: data.token, firstName: data.firstName, username: data.username }));
          
          // On vide les champs username et password
          setSignInUsername("");
          setSignInPassword("");
          
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
      <div>
        <label for="signInUsername">Nom d'utilisateur</label>
        <input
          id="signInUsername"
          type="text"
          placeholder="Entrer votre nom d'utilisateur"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername}
          className={styles.inputSignIn}
          autoComplete="on"
        />
        <label for="signInPassword">Mot de passe</label>
        <input
          id="signInPassword"
          type="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
          className={styles.inputSignIn}
        />
        <button
          onClick={() => handleSubmit()}
          className={styles.btnSubmitSignIn}
        >
          Se connecter
        </button>
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3000/auth/google")
          }
          className={styles.btnSubmitGoogleSignIn}
        >
          <img
            src="/google-logo.png"
            alt="Google"
            className={styles.googleIcon}
          />
          Se connecter avec Google
        </button>
      </div>
    </>
  );
}

export default SignIn;
