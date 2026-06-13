import styles from "../../styles/Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";

function SignIn({ closeModal }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.result) {
          dispatch(login({ token: data.token, username: signInUsername }));
          
          setSignInUsername("");
          setSignInPassword("");

          router.push("/dashboard");
          closeModal?.();
        } else {
          alert(data.error);
        }
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
          autocomplete="on"
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
