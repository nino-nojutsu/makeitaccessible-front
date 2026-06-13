import styles from "../../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // ← ajout useDispatch
import { logout } from "../../reducers/user"; // ← ajout logout
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";

function Header() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch(); // ← ajout

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleCancelSignIn = () => setSignIn(false);
  const handleCancelSignUp = () => setSignUp(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header} role="banner">
      <Link href="/">
        <Image
          src="/images/logo-MakeItAccessible.svg"
          alt="logo MakeItAccessible"
          width={230}
          height={30}
          className={styles.logoImage}
        />
      </Link>
      <nav aria-label="Navigation utilisateur" className={styles.modalesContainer}>
        {/* integrate connexion modals */}
        <button className={styles.btnConnected} onClick={() => {setSignIn(true)}}>
          Se connecter
        </button>

        {user.token ? (
          // Connecté
          <>
            <span className={styles.username}>{user.username} |</span> 
            <button className={styles.btnConnected} onClick={handleLogout}>
              Se déconnecter
            </button>
          </>
        ) : (
          // Non connecté
          <>
            <button className={styles.btnConnected} onClick={() => setSignIn(true)}>
              Se connecter
            </button>
            <button className={styles.btnRegistration} onClick={() => setSignUp(true)}>
              S'inscrire
            </button>
          </>
        )}

        {/* Les modales restent toujours dans le DOM — elles s'ouvrent via open={signIn/signUp} */}
        <Modal
          title="Se connecter à votre compte"
          open={signIn}
          onCancel={() => handleCancelSignIn()}
          footer={null}
          className={styles.modalesSignIn}
        >
          <SignIn closeModal={handleCancelSignIn} />
        </Modal>

        <Modal
          title="Créer votre compte"
          open={signUp}
          onCancel={() => handleCancelSignUp()}
          footer={null}
          className={styles.modalesSignUp}
        >
          <SignUp closeModal={handleCancelSignUp} />
        </Modal>
      </nav>
    </header>
  );
}

export default Header;