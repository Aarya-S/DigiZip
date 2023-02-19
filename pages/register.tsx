import React, { useEffect, useState  } from "react";
import validator from "../utils/PasswordValidator";
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../utils/firebaseconfig";
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "../styles/Register.module.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adhaar,setAdhaar] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState("");
    const [isEmailValid, setIsEmailValid] = useState("");
    const navigate = useRouter();
    const client = axios.create({
        baseURL: "https://digizip.onrender.com/auth" 
      });

    
    // functions to handle the input fields
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        if(password!=isPasswordValid){
            setError("Password mismatching confirm again");
            return false;
        }
        if(validator(password)!=true){
            setError("Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character");
            return false;
        } 
        let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
 
        if( adhaar == "" || adhaar.length <12 || regex.test(adhaar) == false) {
            setError("Invalid Aadhaar Number");
            return false;
        }
        
        
        
        if(error==""){
                client.post("/register",{
                    email:email,
                    aadhaar:adhaar,
                }).then((response)=>{
                    if(response.status==200){
                        const auth = getAuth(app);
                        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            const otp  = prompt("please enter the otp sent to your email id");
                            if(otp==null){
                                alert("we have registered you but you have not verified your aadharID please verify your aadharID");
                                return false;
                            }else{
                            client.post("/check",{
                                email:email,
                                otp:otp
                            }).then((response)=>{
                                if(response.status==200){
                                    alert("User Registered Successfully");
                                }
                                else{
                                    alert("User Registration Failed");
                                }
                            }).catch((error)=>{
                                setError(error.code+" :- "+error.message);
                            })
                            // ...
                        }}).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setError(errorCode+" :- "+errorMessage);
                        })
                    }else{
                        alert("User Already Registered "+ response.data);
                    }
                    console.log(response);
                }).catch((error)=>{
                    setError("User or adhaar already registered")
                }).finally(()=>{
                    if(error==""){
                        navigate.push("/login"); 
                    }
                })
        }

    
            

        setLoading(false);
    }
    
    return (
        <div className={styles.window1}>

            <div className={styles.card}>
              
              <div className={styles.pp}>
                Are You an <br /> User <br />
                </div>
                <br />
                {error?<label htmlFor="error">{error}</label>:""}         
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Enter Email ID/Set UserName</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Set Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Confirm Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Aadhar Number:</label>
                <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <button style={{width:'5vw', marginLeft:'10px'}} onClick={handleSubmit}>Get OTP</button>
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Verify OTP:</label>
                <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                {loading?<label htmlFor="loading">Loading...</label>:
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleSubmit}>Login</button>}
                
            <br/>
            {/* <button onClick={handleGSubmit}>Google</button> */}
            {/* <button onClick={(e)=>{navigate.push('/register')}}>Signup</button> */}
            {/* {email+" "+password} */}

          
            </div>

            <div className={styles.card}>
            
              <div className={styles.pp}>
                Are You an Organization <br />
                </div>
                <br />
                {error?<label htmlFor="error">{error}</label>:""}         
                <label style={{alignSelf:'center'}} htmlFor="loginId">Organization Name</label>
                <input style={{alignSelf:'center'}} type="text" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass">GST Number</label>
                <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Enter Admin Email ID</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Set Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Confirm Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <button style={{width:'5vw', marginLeft:'10px'}} onClick={handleSubmit}>Get OTP</button>
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Verify OTP:</label>
                <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                {loading?<label htmlFor="loading">Loading...</label>:
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleSubmit}>Login</button>}
            <br/>
            {/* <button onClick={handleGSubmit}>Google</button> */}
            {/* <button onClick={(e)=>{navigate.push('/register')}}>Signup</button>
            {email+" "+password} */}

            </div>
      </div>
    )
}