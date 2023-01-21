import { useState } from "react";
import { getSession } from "../utils/sessionhandling";

export default function Dashboard() {
    const[session,setSession] = useState(getSession());
    const[name,setName] = useState(session!=null?session.displayname:'Name not found')
    // const[dob,setDob] = useState(session!=null?session.dob:'DOB not found')
    const[verifiy,setVerifiy] = useState(session!=null?session.verified:'Verification not found')
    const[resetpwd,setResetpwd] = useState('');

    return (
        <>
        Name : {name}<br></br>
        {/* DOB : {dob}<br></br> */}
        Verified : {verifiy}<br></br>
        Change password :- <input type="password" placeholder="Enter new password" onChange={(e)=>setResetpwd(e.target.value)}></input>
         <button>Reset</button>
        </>
    )
}
