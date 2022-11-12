import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faShareAlt, faEye } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
    
      <div className={styles.mainText}>
      Welcome AARYA!
      </div>

      {/* Buttons Div */}
      <div className={styles.home__buttons}>
        <Link className={styles.view__files} href="/viewfiles">
          <FontAwesomeIcon icon={faEye} style={{marginRight: 20}}/> View Files
        </Link>

        <Link className={styles.share__file} href="/sharefile">
          <FontAwesomeIcon icon={faShareAlt} style={{marginRight: 20}} /> Share File
        </Link>

        <Link className={styles.add__file} href="/addfile">
          <FontAwesomeIcon icon={faUpload} style={{marginRight: 20}} /> Add File
        </Link>

      </div>

    </>
  )
}
