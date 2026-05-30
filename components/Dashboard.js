import styles from '../styles/Dashboard.module.css';
import Image from 'next/image';

function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Image src="/logo-MakeItAccessible.svg" width={300} height={300} alt="logo favicon" className={styles.logo} />
      </div>
      <div className={styles.rightSection}>
        <h2 className={styles.title}>Configurer mon compte</h2>
      
        
    <div>
    </div>
    </div>
    </div>
  );
}

export default Dashboard;