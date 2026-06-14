import styles from "../../styles/Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";

function SignIn({ closeModal }) {
  const [url, setUrl] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const auditData = useSelector((store) => store.audit.value);
  const audit = auditData?.audit;
  const website = auditData?.website;

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  useEffect(() => {
    setUrl(window.location);
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
        auditId: audit?.results?._id,
        websiteId: website?._id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.result) {
          dispatch(login({ token: data.token, firstName: data.firstName, username: data.username }));
          
          setSignInUsername("");
          setSignInPassword("");

          if (!data.websiteId && !data.auditId && url.pathname !== '/audit') {
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
