import styles from './Navbar.module.css';
import Link from 'next/link';
import { getSession, removeSession } from '../../utils/sessionhandling';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navbar = () => {
  const[session,setSession] = useState(getSession('user'));
  const navigate = useRouter();
  const signout = () => {
    removeSession('user');
    navigate.push("/");
  }
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
             {session==null?
              <Link className={styles.navLink}  href="/register">Register</Link>
            :
            <>
              <Link className={styles.navLink}  href="/dashboard">Dashboard</Link>
              
              <a className={styles.navLink} onClick={signout}>Signout</a>
            </>
            }
            <Link className={styles.navLink}  href="/login"><b>{session!=null?session.displayname:'Login'}</b></Link>
            
        </div>
    </div>
    </>
  )
}

export default Navbar