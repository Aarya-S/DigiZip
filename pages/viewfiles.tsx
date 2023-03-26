import axios from "axios";
import { useEffect, useState } from "react";
import ViewCardUser from "../components/UserComponents/ViewCard/ViewCard";
import styles from "../styles/UserHome.module.css";
import { createsession, getSession, removeSession } from "../utils/sessionhandling";


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
        <div className={styles.cardsDiv}>
        <button onClick={()=>{handleRefresh()}} className={styles.cardsDiv}>Refresh</button>
        <h3>Your Documents</h3>
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