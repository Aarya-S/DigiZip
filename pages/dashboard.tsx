// import { async } from "@firebase/util";
import axios from "axios";
import { useState } from "react";
import { getSession ,createsession} from "../utils/sessionhandling";
import styles from '../styles/dashboard.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';

export default function Dashboard() {
    const session = getSession('userdetail')
    const value = 8;
    const[name,setName] = useState(session!=null?session.email:'Name not found')
    // const[dob,setDob] = useState(session!=null?session.dob:'DOB not found')
    const[verifiy,setVerifiy] = useState(session!=null?session.verified:'Verification not found')
    const[resetpwd,setResetpwd] = useState('');
    const[encrytFpwd,setencrytFpwd] = useState('');
    const handleonReset = async () => {
        await axios.post('https://digizip.onrender.com/auth/check',{
            email:session.email,
            otp:resetpwd
        }).then((res)=>{
            session.verified = true;
            createsession(session,'userdetail');
            setVerifiy(true);
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data);
        })
    }
    return (
        <>
        <div className={styles.window1}>
            <div className={styles.card}>
            <div className={styles.pp}>
                <h2 style={{textAlign:'center',letterSpacing:'0.5px'}}>Dashboard</h2><br />
            <label style={{}} htmlFor="name">Username/Email </label>
            <input style={{marginLeft:'15px'}} id="name" name="name" value={name} readOnly/><br/><br />
         Account Verified : {verifiy? "Your account is verified":
            <div>
                Verify your account
                <input type="text" placeholder="Enter OTP" onChange={(e)=>setResetpwd(e.target.value)}></input>
                <button onClick={handleonReset}>Verify</button>
            </div>}
            <br></br><br /><hr />
            Your storage consumption - 
            <div style={{paddingTop:'20px',width:'10vw',paddingBottom:'20px'}}>
            <CircularProgressbar value={value} maxValue={200} text={`${value * 100/ 200}%`} 
             styles={buildStyles({pathColor: `rgba(62, 152, 199,${value *100/ 200})`,
             textColor: 'white',
             trailColor: '#d6d6d6',
             backgroundColor: 'white'})} />
            </div>
            <div>
            You have used {value}mb of 200mb free space. <br /><hr />
            <Link className={styles.hov} href="/forgetpwd">Change Password</Link> <br />
            <Link className={styles.hov} href="/forgetpwd">Delete Account</Link><br /><br />

            {/* ye dono mai se koi bhi use kar delete account ke liye aur bacha hua hata de */}

            {/* <button className={styles.hov}>Delete Account</button> */}
            </div>

        {/* set your default FileEncryption password :- <input type="password" placeholder="Enter new password" onChange={(e)=>setencrytFpwd(e.target.value)}></input>
        <button>set</button> */}
        </div>
        </div>
        </div>
        </>
    )
}
