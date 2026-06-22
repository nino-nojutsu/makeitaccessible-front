import styles from '../../styles/Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/user';
import API_BASE_URL from '../../utils/api';

function SignIn({ closeModal }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

     const handleSubmit = () => {
    fetch(`${API_BASE_URL}/users/signin`, {
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
      <button onClick={() => handleSubmit()}  className={styles.btnSubmitSignIn}>Se connecter</button>
      <button 
      onClick={() => window.location.href = `${API_BASE_URL}/auth/google`} 
      className={styles.btnSubmitGoogleSignIn}
      >
        <img
        src="/images/google-logo.png"
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

      
