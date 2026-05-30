import styles from '../styles/Header.module.css';
import Image from 'next/image';
import "antd/dist/antd.css";
import { Modal } from 'antd';
import { useState } from 'react';
import{useSelector} from 'react-redux';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Header() {

        const user = useSelector((state) => state.user.value);

         const [signIn, setSignIn] = useState(false);
         const [signUp, setSignUp] = useState(false);
         
         const [signInModalVisible, setSignInModalVisible] = useState(false);
         const [signUpModalVisible, setSignUpModalVisible] = useState(false);
         
         const handleCancelSignIn = () => {
            setSignInModalVisible(false);
        };
        
        const handleCancelSignUp = () => {
            setSignUpModalVisible(false);
        };
        
	return (
		<header className={styles.header} role="banner">
            <div className={styles.logoWrapper}>
                <div className={styles.iconWrapper}>
                <Image
                    src='/favicon-makeitaccessible.svg'
                    alt=''
                    aria-hidden="true"
                    width={32}
                    height={32}
                    className={styles.favicon}/>
                </div>
                <div className={styles.logoTextWrapper}>
                <Image 
                    src='/images/logo-MakeItAccessible.svg'
                    alt='logo MakeItAccessible'
                    width={150}
                    height={150}
                    className={styles.logo}/>
                </div>
            </div>
                <nav aria-label="S'inscire ou se connecter" className={styles.modalesContainer}>
                    {/* integrate connexion modals */}
                    <button className={styles.btnConnected} onClick={() => {setSignIn(true)}}>
                        Se connecter
                    </button>
                    
                    <Modal
                            title="Se connecter à votre compte"
                            open={signIn}
                            onCancel={() => setSignIn(false)}
                            footer={null} className={styles.modalesSignIn}
                        >
                            <SignIn closeModal={handleCancelSignIn} />
                        </Modal>
                        
                    <button className={styles.btnRegistration} onClick={() => setSignUp(true)}>
                        S'inscrire
                    </button>
                    
                    <Modal
                            title="Créer votre compte"
                            open={signUp}
                            onCancel={() => setSignUp(false)}
                            footer={null} className={styles.modalesSignUp}
                        >
                            <SignUp closeModal={handleCancelSignUp} />
                        </Modal>

                </nav>
		</header>
	);
}

export default Header;
