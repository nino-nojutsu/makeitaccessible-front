import styles from '../styles/Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

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
            setSignInUsername("");
            setSignInPassword("");
            dispatch(login({ token: data.token, username: signInUsername }));
             closeModal?.();
            router.push('/dashboard');

        } else {
          alert(data.error);
        }
      })
  };
  return (
    <>
    <div>
      <label>Nom d'utilisateur</label>
      <input
          type="username"
          placeholder="Entrer votre nom d'utilisateur"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername} className={styles.inputSignIn}
      />
      <label>Mot de passe</label>
      <input
        type="password"
        placeholder="Entrez votre mot de passe"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword}
        className={styles.inputSignIn}
      />
      <button onClick={() => handleSubmit()}>Se connecter</button>
      </div>
    </>
  );
}

export default SignIn;

      