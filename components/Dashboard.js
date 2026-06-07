import styles from '../styles/Dashboard.module.css';
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'


function Dashboard() {

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Link href="/mes-audits" className={styles.navLink}>Mes audits</Link>
        <Link href="/mon-compte" className={styles.navLink}>Mon compte</Link>
        <Link href="/parametres" className={styles.navLink}>Paramètres</Link>
        </div>

        <div className={styles.rightSection}>
          <h2 className={styles.title}>Bienvenue sur votre tableau de bord</h2>
          <p>Depuis cet espace, vous pouvez accéder à vos audits, gérer votre compte et configurer vos paramètres.</p>
        </div>

      </div>          
  );
}

export default Dashboard;