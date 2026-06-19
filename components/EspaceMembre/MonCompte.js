import styles from '../../styles/MonCompte.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar.js';

function MonCompte() {
    const [modifyLastName, setModifyLastName] = useState('');
    const [modifyFirstName, setModifyFirstName] = useState('');
    const [modifyEmail, setModifyEmail] = useState('');
    const [modifyUsername, setModifyUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const user = useSelector((state) => state.user.value);

    const handleSubmit = () => {
        const body = {
            firstName: modifyFirstName,
            lastName: modifyLastName,
            email: modifyEmail,
            username: modifyUsername,
            token: user.token,
        };

        if (signUpPassword) {
            body.password = signUpPassword;
        }

        fetch('http://localhost:3000/users/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    alert('Compte mis à jour avec succès !');
                } else {
                    alert('Erreur lors de la mise à jour du compte : ' + data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Une erreur est survenue lors de la mise à jour du compte.');
            });
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.layout}>
                    <h2>Modifier mon compte</h2>
                    <div className={styles.box}>
                        <div className={styles.field}>
                            <label>Nom</label>
                            <input type="text" placeholder="Entrez votre nom" onChange={(e) => setModifyLastName(e.target.value)} value={modifyLastName} className={styles.inputSignUp} />
                        </div>
                        <div className={styles.field}>
                            <label>Prénom</label>
                            <input type="text" placeholder="Entrez votre prénom" onChange={(e) => setModifyFirstName(e.target.value)} value={modifyFirstName} className={styles.inputSignUp} />
                        </div>
                        <div>
                            <label className={styles.field}>Email</label>
                            <input type="email" placeholder="Entrez votre email" onChange={(e) => setModifyEmail(e.target.value)} value={modifyEmail} className={styles.inputSignUp} />
                        </div>
                        <div>
                            <label className={styles.field}>Nom d'utilisateur</label>
                            <input type="text" placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setModifyUsername(e.target.value)} value={modifyUsername} className={styles.inputSignUp} />
                        </div>
                        <div>
                            <label className={styles.field}>Mot de passe</label>
                            <input type="password" placeholder="Entrez votre mot de passe" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} className={styles.inputSignUp} />
                        </div>
                        <button className={styles.button} onClick={handleSubmit}>Modifier mon compte</button>
                        <button className={styles.buttonDelete}>Supprimer mon compte</button>
                    </div>
                </div>
            </div>
    );
}

export default MonCompte;