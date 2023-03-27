import { faFileCirclePlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewCardUser from "../components/UserComponents/ViewCard/ViewCard";
import styles from "../styles/UserViewFiles.module.css";
import { createsession, getSession, removeSession } from "../utils/sessionhandling";
import Link from 'next/link';


function UserHome() {
    const[files,setFiles] = useState([]);
    const[error,setError] = useState("");

    const Usersession = getSession('userdetail');
    const client = axios.create({
        baseURL: "https://digizip.onrender.com"
        // baseURL: "http://localhost:5000"
    })
    
    useEffect(() => {
      // client.get("/file/get?email="+Usersession.email).then((res)=>{
      //   setFiles(res.data);
      // })
        if(getSession('usercontent')!=null){
            setFiles(getSession('usercontent'));
            console.log("session")
        }else{
            client.get("/file/get?email="+Usersession.email).then((res)=>{
              createsession(res.data,'usercontent')
              setFiles(res.data);
            })
        }
      // return () => {
      //   {files.map((file)=>{
      //     return <ViewCardUser prop={file}/>
      // })}
      // }
    }, [])
    
    const handleRefresh = () => {
      removeSession('usercontent');
      window.location.reload();
    }

    // console.log(files)
    
    return (
        <>
        <div className={styles.UserHomeBody}>
        <br /><br /><br /> <br />
        
        {/* Buttons div */}
        <div className={styles.buttonsDiv}>
          <button onClick={()=>{handleRefresh()}} className={styles.refreshButton}><FontAwesomeIcon icon={faRefresh} style={{marginRight: 15}} />Refresh</button>
          <Link href="/addfile" className={styles.addFileButton}><button className={styles.innerButton}><FontAwesomeIcon icon={faFileCirclePlus} style={{marginRight: 15}} />Add File</button></Link>
        </div>

        <div className={styles.cardsDiv}>
        <h3 className={styles.pageTitle}>Your Documents</h3>
        {error.length>0 && <p>{error}</p>}
        {files.length!=0?
        files.map((file)=>{
          return <ViewCardUser prop={file}/>
        }):<p>No files found</p>
      }
        </div>

        </div>
        </>
    );
};

export default UserHome;