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
          <a href="https://www.linkedin.com/">LinkedIn</a>
        </li>

        <li>
          <a href="https://www.facebook.com/">Facebook</a>
        </li>
            
        <li>
          <a href="https://www.instagram.com/">Instagram</a>
        </li>
      </ul>
    </li>
    
    <li className={styles.nav__item}> 
      <h2 className={styles.nav__title}>About</h2>
      
      <ul className={styles.nav__ul}> 
        <li>
          <a href="/about#privacy">Privacy Policy</a>
        </li>
        
        <li>
          <a href="/about#terms">Terms of Use</a>
        </li>
        
        <li>
          <a href="/about#faqs">FAQ's</a>
        </li>
        
      </ul>
    </li>
    
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title} style={{paddingBottom:'15px'}}>Get Started</h2>
      
      <ul className={styles.nav__ul}>
        <li>
          <a className={styles.footer__btn} style={{color:'black' , width:'120px', marginBottom:'6px'}} href="/register">Signup</a>
        </li>
        
        <li>
          <a className={styles.footer__btn} style={{color:'black', width:'120px'}} href="/login">Login</a>
        </li>
        
      </ul>
    </li>
  </ul>
  
</footer>
        </>
    );
    };

export default Footer;