import { sendPasswordResetEmail,getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { app } from '../utils/firebaseconfig';

export default function forgetpwd (){
    const [email, setemail] = useState('')
    const navigate = useRouter()
    const submit = async ()=>{
        try{
            const auth = getAuth(app);
            await sendPasswordResetEmail(auth,email);
            navigate.push('/login')
        }catch(e){
            alert(e)
        }
    }
    return(
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div><Link href="/login"><button  className="btn btn-outline-dark back-btn"><i className="fa fa-angle-double-left"></i>  Back </button></Link></div>  
        <div className="signup-form">
         <div className="form-box">
                <h2>Forgot Password</h2>
                <p className="hint-text">Enter the email address below</p>
                <div className="form-group">
                    <input type="text" className="" name="Login ID" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="Email ID" />
                </div>  
                
                <div className="form-group">
                    <button type="submit" onClick={submit} className="btn btn-lg btn-block sign-btn">Done</button>
                </div>
            </div>
        </div>
        </>
    )
}