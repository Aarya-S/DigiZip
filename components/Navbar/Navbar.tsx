import styles from './Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
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
            <Link className={styles.navLink}  href="/login"><b>Aarya Shelar</b></Link>
        </div>
    </div>
    </>
  )
}

export default Navbar