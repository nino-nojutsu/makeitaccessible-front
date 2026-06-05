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

      </div>          
  );
}

export default Dashboard;