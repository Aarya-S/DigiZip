import React, { useEffect, useState  } from "react";
import validator from "../utils/PasswordValidator";
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../utils/firebaseconfig";
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "../styles/Register.module.css";
import { createsession } from "../utils/sessionhandling";
import { verify } from "crypto";
import CryptoJS from 'crypto-js';


export default function Register() {
    // general params
    const [loading, setLoading] = useState(false);

    // User Params
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adhaar,setAdhaar] = useState("");
    const [error, setError] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState("");
    const [OTP, setOTP] = useState("");

    // Org Params
    const [name, setName] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
    const [orgerror, setOrgerror] = useState("");
    const [orgOTP, setOrgOTP] = useState("");
    
    // helpers
    const navigate = useRouter();
    const client = axios.create({
        baseURL: "https://digizip.onrender.com" 
        // baseURL: "http://localhost:5000"
      });


    // handle User Registration
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
        // let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
 
        if( adhaar == "" || adhaar.length >12 )/*|| regex.test(adhaar) == false)*/ {
            setError("Invalid Aadhaar Number");
            return false;
        }
        
        if(error==""){
                client.post("/auth/register",{
                    email:email,
                    aadhaar:CryptoJS.AES.encrypt(JSON.stringify(adhaar), "sussybaka").toString(),
                }).then((response)=>{
                    if(response.status==200){
                        const auth = getAuth(app);
                        console.log(response);
                        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                        }).catch((error) => {
                            const errorMessage = error.message;
                            setError(errorMessage.split(" ")[2].split("/")[1].split(")")[0]);
                        })
                    }
                }).catch((error)=>{
                    // setError("otp not valid");
                    setError(error.response.data);
                    setLoading(false);
                    // setError(error);
                })
        }
    }

    // handle Org Registration
    const handleorgsubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setOrgerror("")
        
        if(adminPassword!=adminConfirmPassword){
            setOrgerror("Password mismatching confirm again");
            return false;
        }

        if(validator(adminPassword)!=true){
            setOrgerror("Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character");
            return false;
        }
        if(orgerror==""){
            client.post("/org/make",{
                "name": name,
                "gst_no": gstNo,
                "admin": adminEmail
            }).then((response)=>{
                if(response.status==200){
                    const auth = getAuth(app);
                    createUserWithEmailAndPassword(auth, adminEmail, adminPassword).then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setOrgerror(errorMessage.split(" ")[2].split("/")[1].split(")")[0]);
                    })
                }
            }).catch((error)=>{
                setOrgerror(error.response.data);
                setLoading(false);
            })
        }
    }

    // handle User OTP
    const handleotpUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        await client.post("/auth/check",{
            email:email,
            otp:OTP
        }).then((response)=>{
            if(response.status==200){
                alert("OTP Verified "+response.data);
                navigate.push('/login')
            }else{
                setError(response.data);
            }
        }).catch((error)=>{
            setError(error.response.data);
            return;
        })
        setLoading(false);
    }  

    // handle Org OTP
    const handleotpOrg = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setOrgerror("")
        await client.post("/org/checkotp",{
            admin:adminEmail,
            otp:orgOTP
        }).then((response)=>{
            if(response.status==200){
                alert("OTP Verified "+response.data);
                navigate.push('/login')
            }else{
                // setError(response.data);
                console.log(response.data);
            }
        }).catch((error)=>{
            setOrgerror(error.response.data);
            return;
        })
        setLoading(false);
    }



    return (
        <div className={styles.window1}>

            <div className={styles.card}>
              
              <div className={styles.pp}>
                Are You an <br /> User <br />
                </div>
                <br />    
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Enter Email ID/Set UserName</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Set Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="cnfrmpass" >Confirm Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setIsPasswordValid(e.target.value)}} id="cnfrmpass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="aadhar" >Aadhaar Number</label>
                <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setAdhaar(e.target.value)}} id="aadhar" name="loginId"/><br/>

                {error?<label htmlFor="error" style={{color: "red",alignSelf:"center",marginTop:"20px"}}>{error}</label>:""}     
                {loading?<label htmlFor="loading">Loading...</label>:
                    <button style={{alignSelf:'center',width:'10vw'}} onClick={handleSubmit}>SignUp</button>}
                {loading==true && error==""?<><label style={{alignSelf:'center'}} htmlFor="otp" >Verify OTP:</label>
                <input style={{alignSelf:'center'}} onChange={(e)=>{setOTP(e.target.value)}} id="otp" name="otp"/><br/>
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleotpUser}>Submit</button></>:""}
                {error?<label htmlFor="error" style={{color: "red",alignSelf:"center",marginTop:"20px"}}>{error}</label>:""}     

            <br/>

          
            </div>

            <div className={styles.card}>
            
              <div className={styles.pp}>
                Are You an Organization <br />
                </div>
                <br />
                             
                    <label style={{alignSelf:'center'}} htmlFor="orgname">Organization Name</label>
                    <input style={{alignSelf:'center'}} type="text" onChange={(e)=>{setName(e.target.value)}} id="orgname" name="orgname"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="gstno">Registration Number</label>
                    <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setGstNo(e.target.value)}} id="gstno" name="gstno"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="admin" >Enter Admin Email ID</label>
                    <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setAdminEmail(e.target.value)}} id="admin" name="admin"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="orgpass" >Set Password</label>
                    <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setAdminPassword(e.target.value)}} id="orgpass" name="orgpass"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="orgcpass" >Confirm Password</label>
                    <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setAdminConfirmPassword(e.target.value)}} id="orgcpass" name="orgcpass"/><br/>
                    {/* {name+" "+ gstNo+" "+  adminEmail+" "+  adminPassword+" "+  adminConfirmPassword} */}
                    {loading?<label htmlFor="loading">Loading...</label>:
                    <button style={{alignSelf:'center',width:'10vw'}} onClick={handleorgsubmit}>SignUp</button>}
                    {loading==true && orgerror==""?<><label style={{alignSelf:'center'}} htmlFor="otporg" >Verify OTP:</label>
                    <input style={{alignSelf:'center'}} onChange={(e)=>{setOrgOTP(e.target.value)}} id="otporg" name="otporg"/><br/>
                    <button style={{alignSelf:'center',width:'10vw'}} onClick={handleotpOrg}>Submit</button></>:""}
                <br/>
            </div>
      </div>
    )
}