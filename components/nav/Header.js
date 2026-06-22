import styles from "../../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/user";
import { useRouter } from "next/router";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";

function Header() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleCancelSignIn = () => setSignIn(false);
  const handleCancelSignUp = () => setSignUp(false);

  const handleLogout = () => {
    router.push("/");
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
      <nav
        aria-label="Navigation utilisateur"
        className={styles.modalesContainer}
      >
        {user.token ? (
          // Connecté
          <div className={styles.modalesContainer}>
            <div className={styles.userInfo}>
              <span className={styles.userFirstName}>{user.firstName}</span>
              <span className={styles.userName}>@{user.username}</span>
            </div>
            <div className={styles.userActions}>
              <Link href="/dashboard" className={styles.dashboardLink}>
                <span className={styles.linkDashboard}>Mon Dashboard</span>
              </Link>
              <button className={styles.linkDeconnexion} onClick={handleLogout}>
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          // Non connecté
          <>
            <button
              type="button"
              aria-controls="modal-signin"
              aria-haspopup="dialog"
              aria-expanded={signIn}
              className={styles.btnConnected}
              onClick={() => setSignIn(true)}
            >
              Se connecter
            </button>
            <button
              type="button"
              aria-controls="modal-signup"
              aria-haspopup="dialog"
              aria-expanded={signUp}
              className={styles.btnRegistration}
              onClick={() => setSignUp(true)}
            >
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
