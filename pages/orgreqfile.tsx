import axios from "axios";
import { useEffect, useState } from "react";
import OrgViewCard from "../components/OrgComponent/OrgViewcard";
import { createsession, getSession } from "../utils/sessionhandling";
import styles from "../styles/UserHome.module.css";
export default function orgreqfile(){
    const orgdetail = getSession('orgdetail') || {};
    // const client = axios.create({
    //     // baseURL: "https://digizip.onrender.com"
    //     baseURL: "http://localhost:5000"
    // })
    return (
        <div className={styles.UserHomeBody}>
            <br />
            <br />
            <br />
            <label color="white">User Email : - </label><br/>
            <input type="email" placeholder="Enter the email of the user you want to request" /><br/>
            <label color="white">Title of Request </label><br/>
            <input type="text" placeholder="Enter the hash of the file you want to request" /><br/>
            <label>Default text : - </label><br/>
            orgcode : {orgdetail.generated_hash}<br/>
            orgname : {orgdetail.name}<br/>
            <label>Enter Description : - </label><br/>
            <textarea placeholder=""/><br/>
            <button>Request</button>
        </div>
    )
}