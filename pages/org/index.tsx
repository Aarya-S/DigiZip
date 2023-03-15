import styles from 'styles/org.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileImport } from "@fortawesome/free-solid-svg-icons";

export default function OrgHome(){
    return (
        <>
        <br /><br /><br /><br /><br />
        <div className={styles.OrgHomeWrapper}>
            <h3>Welcome to Digizip, DYPU</h3><br />
            <div className={styles.actionButtonsDiv}>
                <Link className={styles.actionButton} href="/org/viewfiles">
                    <FontAwesomeIcon icon={faEye} style={{marginRight: 20}} /> View Shared
                </Link>
                <Link className={styles.actionButton} href="/org/requestfiles">
                    <FontAwesomeIcon icon={faFileImport} style={{marginRight: 20}} />Request Files
                </Link>
            </div>
        </div>
        </>
    );
}