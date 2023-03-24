import { useState } from "react";
import { getSession } from "../utils/sessionhandling";
import styles from "../styles/Orgdashboard.module.css";
import Link from 'next/link';

export default function OrgDashBoard() {
    const orgdetail = getSession('orgdetail');
    const [admin, setAdmin] = useState(orgdetail.admin);


    const changeAdmin = () => {
        let person = prompt("Please enter your name", admin);
        if (person != null && person != "") {
            console.log(person);
            setAdmin(person);
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
        <input style={{marginLeft:'15px'}} id="admin" name="admin" value={admin} readOnly/>
        <button onClick={changeAdmin}>edit</button><br/>
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
                New Admin is not verified yet.<br/>
                Please verify by entering the OTP sent to admin email account<br/>
                <input type="text" placeholder="Enter OTP"/>&nbsp; &nbsp;<button>Verify</button>
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
            <Link className={styles.hov} href="/forgetpwd">Change Password</Link> <br />
            <Link className={styles.hov} href="/forgetpwd">Delete Account</Link><br /><br />

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
