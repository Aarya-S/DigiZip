import axios from "axios";
import { useEffect, useState } from "react";
import OrgViewCard from "../components/OrgComponent/OrgViewcard";
import { createsession, getSession, removeSession } from "../utils/sessionhandling";
import styles from "../styles/UserHome.module.css";
export default function orgviewfile(){
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
            <button onClick={()=>{handleRefresh()}} className={styles.cardsDiv}>Refresh</button>
            <h3 className={styles.cardsDiv}>Your Documents</h3>
            <div className={styles.cardsDiv}>
                {
                    files.map((file)=>{
                        return <OrgViewCard prop={file}/>
                    })
                }
                {
                    files.length==0 ?<p>No files found</p>:<></>
                }
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}