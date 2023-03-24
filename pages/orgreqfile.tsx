import axios from "axios";
import { useEffect, useState } from "react";
import OrgViewCard from "../components/OrgComponent/OrgViewcard";
import { createsession, getSession } from "../utils/sessionhandling";
import styles from "../styles/Orgreqfile.module.css";
export default function orgreqfile(){
    const orgdetail = getSession('orgdetail') || {};
    // const client = axios.create({
    //     // baseURL: "https://digizip.onrender.com"
    //     baseURL: "http://localhost:5000"
    // })
    return (
        <div className={styles.window1}>
            <div className={styles.card}>
                <div className = {styles.pp}>
            <h2 style={{textAlign:'center',letterSpacing:'0.5px'}}>Request Files from User <hr style={{color:'white'}}/></h2><br />
            <label color="white">Username/Email ID :- </label><br/>
            <input type="email" style={{width:'25vw'}} placeholder="Enter the Username/Email ID of the user" /><br/><br />
            <label color="white">Purpose/Subject :- </label><br/>
            <input style={{width:'25vw'}} type="text" placeholder="Enter the title of request" /><br/><br />
            <label>Enter Description : - </label><br/>
            <textarea cols={60} rows={4} maxLength={1000} placeholder="Specify the required documents and other details (optional)"/><br/><br /><hr />
            <label style={{color:'gray', fontStyle:'italic'}}>User will be able to view your following details while receiving request :- </label><br/>
            <label style={{paddingTop:'10px'}} htmlFor="admin">Organization Name -</label>
            <input style={{marginLeft:'15px', borderRadius:'10px'}} value={orgdetail.name} readOnly/> <br />
            <label style={{paddingTop:'10px'}} htmlFor="admin">Organization Code -</label>
            <input style={{marginLeft:'18px', borderRadius:'10px'}} value={orgdetail.generated_hash} readOnly/> <br /><br />
           <button className={styles.pov}>Request</button>
        </div>
        </div>
        </div>
    )
}