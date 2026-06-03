import styles from '../../styles/Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/user';

  function SignUp() {

      const dispatch = useDispatch();
      const router = useRouter();
      
      const [signUpLastName, setSignUpLastName] = useState('');
      const [signUpFirstName, setSignUpFirstName] = useState('');
      const [signUpEmail, setSignUpEmail] = useState('');
      const [signUpUsername, setSignUpUsername] = useState('');
      const [signUpPassword, setSignUpPassword] = useState('');

    const handleRegister = () => {
      fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lastName: signUpLastName,
          firstName: signUpFirstName,
          email: signUpEmail,
          username: signUpUsername,
          password: signUpPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setSignUpLastName('');
            setSignUpFirstName('');
            setSignUpEmail('');
            setSignUpUsername('');
            setSignUpPassword('');
            router.push('/dashboard');
            dispatch(login({ token: data.token, username: signUpUsername }));
          } else { 
            alert(data.error);
          }
        })
    };

    return (
      <>
      <div>
        <label>Nom</label>
      <input
          type="text"
          placeholder="Entrez votre nom"
          onChange={(e) => setSignUpLastName(e.target.value)}
          value={signUpLastName} className={styles.inputSignUp}
        />
        <label>Prénom</label>
        <input
          type="text"
          placeholder="Entrez votre prénom"
          onChange={(e) => setSignUpFirstName(e.target.value)}
          value={signUpFirstName} className={styles.inputSignUp}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Entrez votre email"
          onChange={(e) => setSignUpEmail(e.target.value)}
          value={signUpEmail} className={styles.inputSignUp}
        />
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername} className={styles.inputSignUp}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword} className={styles.inputSignUp}
        />
        <button onClick={handleRegister}>S'inscrire</button>
        </div>
      </>
    );
  }

  export default SignUp;
