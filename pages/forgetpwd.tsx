import { sendPasswordResetEmail,getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { app } from '../utils/firebaseconfig';

export default function Forgetpwd (){
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
        <div style={{paddingTop:'13vh',paddingLeft:"1vw", backgroundColor:'black',height:'100vh',width:'100vw',color:'white'}}>
        <div><Link href="/login"><button  className="btn btn-outline-light back-btn"><i className="fa fa-angle-double-left"></i>  Back </button></Link></div>  
        <div style={{paddingLeft:'10vh',paddingTop:'10vh'}} className="signup-form">
         <div className="form-box">
                <h2>Forgot/Reset Password - </h2>
                <p className="hint-text">Enter your email address below</p>
                <div className="form-group">
                    <input type="text" className="" name="Login ID" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="Email ID" />
                </div>  
                
                <div className="form-group"><br />
                    <button type="submit" onClick={submit} className="btn btn-light btn-lg btn-block sign-btn">Submit</button>
                </div>
        </div>
        </div>
        </div>

        </>
    )
}