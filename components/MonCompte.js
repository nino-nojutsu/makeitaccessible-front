import styles from '../styles/MonCompte.module.css';
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import Image from 'next/image';

function MonCompte() {
    
    const router = useRouter();
    
    const [signUpLastName, setSignUpLastName] = useState('');
    const [signUpFirstName, setSignUpFirstName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const user = useSelector((state) => state.user.value);
    
    const handleSubmit = () => {
        const body = {
            firstName: signUpFirstName,
            lastName: signUpLastName,
            email: signUpEmail,
            username: signUpUsername,
            token: user.token
        };
        
        if (signUpPassword) {
            body.password = signUpPassword;
        }

        fetch('http://localhost:3000/users/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
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
            <div className={styles.leftSection}>
                <div className={styles.logoWrapper}>
                    <Image
                    src="/favicon-makeitaccessible.svg"
                    alt="logo"
                    width={32}
                    height={32}
                    />
                

                    <div className={styles.logoTextWrapper}>
                       
                        </div>
                        <div className={styles.logoContainer}>
                            <span className={styles.logoFirstText}>MakeIt</span>
                            <span className={styles.logoSecondText}>Accessible</span>
                            </div>
                    </div>
                    <Link href="/mes-audits" className={styles.navLink}>Mes audits</Link>
                    <Link href="/mon-compte" className={styles.navLink}>Mon compte</Link>
                    <Link href="/parametres" className={styles.navLink}>Paramètres</Link>
                    </div>
                    
                    <div className={styles.rightSection}>
                        <h2 className={styles.title}>Modifier mon compte</h2>
                        
                        <div className={styles.card}>
                            <div className={styles.field}>
                                <label >Nom</label>
                                <input
                                type="text"
                                placeholder="Entrez votre nom"
                                onChange={(e) => setSignUpLastName(e.target.value)}
                                value={signUpLastName} className={styles.inputSignUp}
                                />
                                </div>
                                
                                <div className={styles.field}>
                                    <label>Prénom</label>
                                    <input
                                    type="text"
                                    placeholder="Entrez votre prénom"
                                    onChange={(e) => setSignUpFirstName(e.target.value)}
                                    value={signUpFirstName} className={styles.inputSignUp}
                                    />
                                    </div>
                                    
                                    <div className={styles.field}>
                                        <label>Email</label>
                                        <input
                                        type="email"
                                        placeholder="Entrez votre email"
                                        onChange={(e) => setSignUpEmail(e.target.value)}
                                        value={signUpEmail} className={styles.inputSignUp}
                                        />
                                        </div>
                                        
                                        <div className={styles.field}>
                                            <label>Nom d'utilisateur</label>
                                            <input
                                            type="text"
                                            placeholder="Entrez votre nom d'utilisateur"
                                            onChange={(e) => setSignUpUsername(e.target.value)}
                                            value={signUpUsername} className={styles.inputSignUp}
                                            />
                                            </div>
                                            
                                            <div className={styles.field}>
                                                <label>Mot de passe</label>
                                                <input
                                                type="password"
                                                placeholder="Entrez votre mot de passe"
                                                onChange={(e) => setSignUpPassword(e.target.value)}
                                                value={signUpPassword} className={styles.inputSignUp}
                                                />
                                                </div>
                                                
                                                <button className={styles.button} onClick={handleSubmit}>Modifier mon compte</button>
                                                </div>
                                                </div>
                                                </div>
                                                );
                                                }
                                                
export default MonCompte;