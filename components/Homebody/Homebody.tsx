import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faShareAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from './Homebody.module.css';

const Homebody = () => {
    return (
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
    );
    };

export default Homebody;