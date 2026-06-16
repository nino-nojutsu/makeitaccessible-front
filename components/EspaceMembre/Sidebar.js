import styles from '../../styles/Dashboard.module.css';
import Image from "next/image";
import Link from "next/link";
import { logout } from "../../reducers/user";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

function Sidebar() {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
        dispatch(logout());
    };

    return (
        <div className={styles.leftSection}>
            <div>
                    <Image src="/images/logo-white-MakeItAccessible.svg" alt="Logo" width={150} height={30} />

                <nav className={styles.navLinks}>
                    <Link href="/dashboard">
                        <a className={styles.navLink}>Mon tableau de bord</a>
                    </Link>
                    <Link href="/mes-audits">
                        <a className={styles.navLink}>Mes audits</a>
                    </Link>
                    <Link href="/mon-compte">
                        <a className={styles.navLink}>Mon compte</a>
                    </Link>
                    <Link href="/parametres">
                        <a className={styles.navLink}>Paramètres</a>
                    </Link>
                </nav>
            </div>
            {/* Bas : infos utilisateur + déconnexion — sticky en bas grâce à justify-content: space-between */}
            <div className={styles.userSection}>
                <p className={styles.name}>{user.firstName}</p>
                <p className={styles.username}>@{user.username}</p>
                <button className={styles.logout} onClick={handleLogout}>
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}

export default Sidebar;