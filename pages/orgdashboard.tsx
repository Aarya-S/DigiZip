import { useState } from "react";
import { createsession, getSession, removeSession } from "../utils/sessionhandling";
import styles from "../styles/Orgdashboard.module.css";
import Link from 'next/link';
import axios from "axios";
import user from "@nextui-org/react/types/user";
import { deleteUser } from "@firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../utils/firebaseconfig";

export default function OrgDashBoard() {
    const orgdetail = getSession('orgdetail');
    const user = getSession('user');
    const [otp, setOtp] = useState("");
    const [account, setAccount] = useState(orgdetail!=null?orgdetail.account:'Account not found');
    const client = axios.create({
        baseURL: "https://digizip.onrender.com/org"
        // baseURL: "http://localhost:5000/org"
    })

    // const changeAdmin = async () => {
    //     let val = confirm("Are you sure you want to change admin email?").valueOf();
    //     let person = prompt("Please enter your name", admin);
    //     if (person != null && person != "" && person != admin && val != false) {
    //         alert("Changeing admin email to " + person+"...");
    //         await client.post('/updateadmin', {
    //             oldadmin : admin,
    //             newadmin : person,
    //         }).then((res)=>{
    //             alert("Admin email changed to "+person+" successfully you have to reverify your account");
    //             orgdetail.admin = person;
    //             removeSession('orgdetail');
    //             createsession(orgdetail,'orgdetail');
    //             setAdmin(person);
    //         }).catch((err)=>{
    //             console.log(err);
    //             alert("error occured may be due to account already in use or network error");
    //         })
    //     }
    // }

    const handleverification = async () => {
        if(otp!=""){
            await client.post('/checkotp', {
                admin : orgdetail.admin,
                otp : orgdetail.otp,
            }).then((res)=>{
                orgdetail.verified = true;
                removeSession('orgdetail');
                createsession(orgdetail,'orgdetail').then((res)=>{
                    window.location.href = '/orgdashboard';
                    alert("Verification of email "+orgdetail.admin+" is successful");
                }).catch((err)=>{
                    console.log(err)
                });
            }).catch((err)=>{
                console.log(err);
                alert(err);
            })
        }
    }

    const handleonReset = async () => {
        let val = confirm("Are you sure you want to delete your account?").valueOf();
        if(val!=false){
            const auth = getAuth(app);
            await deleteUser(auth.currentUser?auth.currentUser:user).then(() => {
                client.delete('/del?admin='+orgdetail.admin).then((res)=>{
                    alert(res.data);
                    window.location.href = '/';
                    removeSession('userdetail');
                    removeSession('user');
                    removeSession('usercontent');
                }).catch((err)=>{
                    console.log(err);
                    alert(err);
                })
            }).catch((err) => {
                // An error ocurred
                // ...
                console.log(err);
                alert(err);
            });
        }
    }

    return (
        <>
    <div className={styles.window1}>
        <div className={styles.card}>
            <div className={styles.pp}>
        
            <h2 style={{textAlign:'center',letterSpacing:'0.5px'}}>Dashboard</h2><br />

            <label style={{}} htmlFor="username">Username </label>
            <input style={{marginLeft:'15px'}} id="username" name="username" value={orgdetail.name} readOnly/><br/>
        <br/>
        <label style={{}} htmlFor="admin">Admin </label>
        <input style={{marginLeft:'15px'}} id="admin" name="admin" value={orgdetail.admin} readOnly/><br/>
        <br/>
        <label style={{}} htmlFor="admin">organization share Code </label>
        <input style={{marginLeft:'15px'}} id="admin" name="admin" value={orgdetail.generated_hash} readOnly/>
        {/* <button onClick={changeAdmin}>edit</button><br/> */}
        <br/><hr />

        Organization Accounts :-  <br /><br />
        <div> 
            Account 1 - <input style={{border: '0',outline: '0',background: 'transparent',borderBottom: '1px solid white'}} value={orgdetail.accounts[0]} />
            &nbsp;<button>edit</button>
            &nbsp;<a className="material-symbols-outlined" style={{color:'red'}}>delete</a><br />
            Account 2 - <input style={{border: '0',outline: '0',background: 'transparent',borderBottom: '1px solid white', marginTop:'15px'}} value={orgdetail.accounts[1]} />
            &nbsp;<button>edit</button>
            &nbsp;<a className="material-symbols-outlined" style={{color:'red'}}>delete</a><br />
            Account 3 - <input style={{border: '0',outline: '0',background: 'transparent',borderBottom: '1px solid white',marginTop:'15px'}} value={orgdetail.accounts[2]} />
            &nbsp;<button>edit</button>
            &nbsp;<a className="material-symbols-outlined" style={{color:'red'}}>delete</a><br />
            <br/> <br />
            <button>Add more accounts</button>
        </div><br/>
        <hr />
        <label style={{}} htmlFor="gst_no">Organization Registration Number </label>
        <input style={{marginLeft:'15px'}} id="gst_no" name="gst_no" value={orgdetail.gst_no} readOnly/><br/><br/>

        Admin Verified = {orgdetail.verified_admin?
        <span>Yes</span>:
            <div>
                Please verify admin by entering the OTP sent to admin email account<br/>
                <input type="text" placeholder="Enter OTP" onChange={(e)=>{setOtp(e.target.value)}}/>&nbsp; &nbsp;
                <button onClick={handleverification}>Verify</button>
                <br/>
            </div>
        }<br/>
        <br />Organization Verified = {orgdetail.verified_org?
        <span>Yes</span>:
        <div>Your Organization is not verified yet.<br/><br />
            <label htmlFor="org">For verification purpose, select type of Organization - </label>
                <select name="org" id="org" required>
                    <option value="edu">Educational Institute</option>
                    <option value="gov" selected>Government Organization</option>
                    <option value="private">Private Organization</option>
                    <option value="health">Healthcare</option>
                </select>
            <br />
            <br /><input placeholder="Enter registration number"/>&nbsp; &nbsp;<button>Apply for verification</button>
            {/* Yaha pe GST verification / baki verificationz ka sources ka daaldenge */}
            <br /><hr />
            <Link className={styles.hov} href="/forgetpwd">Change Password</Link><br />
            <p className={styles.hov} onClick={handleonReset}>Delete Organization</p><br /><br />

            {/* ye dono mai se koi bhi use kar delete account ke liye aur bacha hua hata de */}

            {/* <button className={styles.hov}>Delete Account</button> */}
            </div>

            
            
            }


        </div>
        </div>
        </div>
        </>
    )
}
