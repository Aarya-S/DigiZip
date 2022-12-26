import styles from './Navbar.module.css';
import Link from 'next/link';
import { getSession } from '../../utils/sessionhandling';

const Navbar = () => {
  const session = getSession();
  return (
    <>
    <div className={styles.navbar}>
        <div className={styles.navbar__logo}>
            <Link className={styles.logoText} href="/">
            DigiZip 
            </Link>
        </div>
        <div className={styles.navbar__links}>
            <Link className={styles.navLink}  href="/about">About</Link>
            <Link className={styles.navLink}  href="/register">Register</Link>
            <Link className={styles.navLink}  href="/login"><b>{session!=null?session.displayname:'login'}</b></Link>
        </div>
    </div>
    </>
  )
}

export default Navbar