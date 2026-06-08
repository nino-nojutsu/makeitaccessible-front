import styles from "../../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";

function Header() {
  const user = useSelector((state) => state.user.value);

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleCancelSignIn = () => setSignIn(false);
  const handleCancelSignUp = () => setSignUp(false);

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
      <nav
        aria-label="S'inscrire ou se connecter"
        className={styles.modalesContainer}
      >
        {/* integrate connexion modals */}
        <button
          className={styles.btnConnected}
          onClick={() => {
            setSignIn(true);
          }}
        >
          Se connecter
        </button>

        <Modal
          title="Se connecter à votre compte"
          open={signIn}
          onCancel={() => setSignIn(false)}
          footer={null}
          className={styles.modalesSignIn}
        >
          <SignIn closeModal={handleCancelSignIn} />
        </Modal>

        <button
          className={styles.btnRegistration}
          onClick={() => setSignUp(true)}
        >
          S'inscrire
        </button>

        <Modal
          title="Créer votre compte"
          open={signUp}
          onCancel={() => setSignUp(false)}
          footer={null}
          className={styles.modalesSignUp}
        >
          <SignUp closeModal={handleCancelSignUp} />
        </Modal>

        <Modal
          title="Créer votre compte"
          open={signUp}
          onCancel={() => setSignUp(false)}
          footer={null}
          className={styles.modalesSignUp}
        >
          <SignUp />
        </Modal>
      </nav>
    </header>
  );
}

export default Header;
