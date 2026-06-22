import API_BASE_URL from '../utils/api';
import styles from '../styles/Header.module.css';

function GoogleLogin() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <main>
      <button onClick={handleGoogleLogin} className={styles.btnSubmitGoogleSignIn}>
        <img src="/images/google-logo.png" alt="Google" className={styles.googleIcon} />
        Se connecter avec Google
      </button>
    </main>
  );
}

export default GoogleLogin;
