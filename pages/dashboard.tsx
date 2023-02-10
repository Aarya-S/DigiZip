import { async } from "@firebase/util";
import axios from "axios";
import { useState } from "react";
import { getSession ,createsession} from "../utils/sessionhandling";

export default function Dashboard() {
    const[session,setSession] = useState(getSession('userdetail'));
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
        <div>
        email : {name}<br></br>
        Verified : {verifiy? "Your account is verified":
            <div>
                Verify your account
                <input type="text" placeholder="Enter OTP" onChange={(e)=>setResetpwd(e.target.value)}></input>
                <button onClick={handleonReset}>Verify</button>
            </div>}
            <br></br>
        set your default FileEncryption password :- <input type="password" placeholder="Enter new password" onChange={(e)=>setencrytFpwd(e.target.value)}></input>
        <button>set</button>
        </div>
    )
}
