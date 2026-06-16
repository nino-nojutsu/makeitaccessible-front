import styles from '../../styles/Footer.module.css';
import Image from 'next/image';

function Footer({ variant = "home" }) {
  if (variant === "dashboard") {
    return (
      <footer className={styles.footerDashboard}>
        <p className={styles.credit}>© MakeItAccessible - 2026</p>
      </footer>
    );
  }

  return (
    <div className={styles.footerWrapper}>
      <Image
        src='/images/illustration-presentation.svg'
        alt=''
        aria-hidden="true"
        width={150}
        height={150}
        unoptimized
        className={styles.footerImg}
      />
      <footer className={styles.footer}>
        <p className={styles.credit}>© MakeItAccessible - 2026</p>
      </footer>
    </div>
  );
}

export default Footer;