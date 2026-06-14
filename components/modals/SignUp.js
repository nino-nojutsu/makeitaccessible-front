import styles from "../../styles/Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";

function SignUp({ closeModal }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username: signUpUsername }));

          setSignUpLastName("");
          setSignUpFirstName("");
          setSignUpEmail("");
          setSignUpUsername("");
          setSignUpPassword("");

          router.push("/dashboard");
          closeModal?.();
        } else {
          alert(data.error);
        }
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
        autocomplete="on"
      />

      <label for="signUpFirstname">Prénom</label>
      <input
        id="signUpFirstname"
        type="text"
        placeholder="Entrez votre prénom"
        onChange={(e) => setSignUpFirstName(e.target.value)}
        value={signUpFirstName}
        className={styles.inputSignUp}
        autocomplete="on"
      />

      <label for="signUpEmail">Email</label>
      <input
        id="signUpEmail"
        type="email"
        placeholder="Entrez votre email"
        onChange={(e) => setSignUpEmail(e.target.value)}
        value={signUpEmail}
        className={styles.inputSignUp}
        autocomplete="on"
      />

      <label for="signUpUsername">Nom d'utilisateur</label>
      <input
        id="signUpUsername"
        type="text"
        placeholder="Entrez votre nom d'utilisateur"
        onChange={(e) => setSignUpUsername(e.target.value)}
        value={signUpUsername}
        className={styles.inputSignUp}
        autocomplete="on"
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
