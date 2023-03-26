import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
         <footer className={styles.footer}>
  <div className={styles.footer__addr}>
    <h1 className={styles.footer__logo}>DigiZip</h1>
    
    <address>
      Ramrao Adik Institute of Technology, Nerul, Navi Mumbai, Maharashtra, 400706.<br/><br />
          
      <a className={styles.footer__btn} href="mailto:pranavyede@gmail.com">Email Us</a>
      <a className={styles.footer__btn} style={{marginLeft:'20px'}}  href="tel:9004960511">Call Us</a>
    </address>
  </div>
  
  <ul className={styles.footer__nav}>
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title}>Find us on</h2>

      <ul className={styles.nav__ul}>
        <li>
          <Link href="https://www.linkedin.com/"><span className={styles.nav_link}>LinkedIn</span></Link>
        </li>

        <li>
          <Link href="https://www.facebook.com/"><span className={styles.nav_link}>Facebook</span></Link>
        </li>
            
        <li>
          <Link href="https://www.instagram.com/"><span className={styles.nav_link}>Instagram</span></Link>
        </li>
      </ul>
    </li>
    
    <li className={styles.nav__item}> 
      <h2 className={styles.nav__title}>About</h2>
      
      <ul className={styles.nav__ul}> 
        <li>
          <Link href="/about#privacy"><span className={styles.nav_link}>Privacy Policy</span></Link>
        </li>
        
        <li>
          <Link href="/about#terms"><span className={styles.nav_link}>Terms of Use</span></Link>
        </li>
        
        <li>
          <Link href="/about#faqs"><span className={styles.nav_link}>FAQs</span></Link>
        </li>
        
      </ul>
    </li>
    
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title} style={{paddingBottom:'15px'}}>Get Started</h2>
      
      <ul className={styles.nav__ul}>
        <li>
          <Link className={styles.footer__btn} style={{color:'black' , width:'120px', marginBottom:'6px'}} href="/register">Signup</Link>
        </li>
        
        <li>
          <Link className={styles.footer__btn} style={{color:'black', width:'120px'}} href="/login">Login</Link>
        </li>
        
      </ul>
    </li>
  </ul>
  
</footer>
        </>
    );
    };

export default Footer;