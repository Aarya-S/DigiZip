import ViewCardUser from "../components/UserComponents/ViewCard/ViewCard";
import styles from "../styles/UserHome.module.css";


function UserHome() {
    return (
        <>
        <div className={styles.UserHomeBody}>
        <br /><br /><br /> <br />


        <div className={styles.cardsDiv}>
        <h3>Your Documents</h3>
        <ViewCardUser />
        <ViewCardUser />
        <ViewCardUser />

        </div>

        </div>
        </>
    );
};

export default UserHome;