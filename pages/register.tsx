import React, { useEffect, useState  } from "react";
import validator from "../utils/PasswordValidator";
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../utils/firebaseconfig";
import { useRouter } from 'next/router';
import axios from 'axios';

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
        <>
            {error?<span className="label warning">{error}</span>:""}
            {loading?<label htmlFor="loginId">just Showing loading here</label>:""}
            <br/>
                <label htmlFor="loginId">Email ID:</label><br/>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label htmlFor="pass">Password:</label><br/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label htmlFor="confrmPass">Confirm Password:</label><br/>
                <input type="password" onChange={(e)=>{setIsPasswordValid(e.target.value)}} id="confrmPass" name="confrmPass"/><br/>
                <label htmlFor="adhaar">Aadhaar Number:</label><br/>
                <input type="text" onChange={(e)=>{setAdhaar(e.target.value)}} id="adhaar" name="adhaar"/><br/>
                {
                    email+ " "+password+" "+adhaar
                }
            <br/>
            {loading ? <div>Loading...</div> : <button onClick={handleSubmit}>Signup</button>}

        </>
    )
}