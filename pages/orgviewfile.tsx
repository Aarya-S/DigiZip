import axios from "axios";
import { useEffect, useState } from "react";
import OrgViewCard from "../components/OrgComponent/OrgViewcard";
import { createsession, getSession, removeSession } from "../utils/sessionhandling";
import styles from "../styles/UserViewFiles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
export default function Orgviewfile(){
    const [files,setFiles] = useState([]);
    const [error,setError] = useState("");
    const orgdash = getSession('orgdetail');
    const client = axios.create({
        baseURL: "https://digizip.onrender.com"
        // baseURL: "http://localhost:5000"
    })
    useEffect(() => {
        if(getSession('orgcontent')!=null){
            setFiles(getSession('orgcontent'));
        }else{
            client.get("/preset/getPresets?orghash="+orgdash.generated_hash).then((res)=>{
              createsession(res.data,'orgcontent')
              setFiles(res.data);
            })
        }
    }, [])
    const handleRefresh = () => {
        removeSession('orgcontent');
        window.location.reload();
      }
    return(
        <div className={styles.UserHomeBody}>
            <br />
            <br />
            <br />
            <div className={styles.centerDiv}>
            <div className={styles.buttonsDivOrg}>
                <button onClick={()=>{handleRefresh()}} className={styles.refreshButton} style={{width: 300}}> <FontAwesomeIcon icon={faRefresh} style={{marginRight: 15}} />Refresh</button>
            </div>

            <h3 className={styles.pageTitle}>Your Documents</h3>
            <div className={styles.cardsDiv}>
                {
                    files.map((file)=>{
                        return <OrgViewCard prop={file} key={1} />
                    })
                }
                {
                    <div style={{color: "white"}}>
                        {files.length==0 ?<p>No files found</p>:<></>}
                    </div>
                }
            </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}