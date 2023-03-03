import React, { useEffect, useState  } from "react";
import validator from "../utils/PasswordValidator";
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../utils/firebaseconfig";
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "../styles/Register.module.css";

export default function Register() {
    // general params
    const [loading, setLoading] = useState(false);

    // User Params
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adhaar,setAdhaar] = useState("");
    const [error, setError] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState("");

    // Org Params
    const [name, setName] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
    const [orgerror, setOrgerror] = useState("");
    
    // helpers
    const navigate = useRouter();
    const client = axios.create({
        baseURL: "https://digizip.onrender.com" 
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
                    aadhaar:adhaar,
                }).then((response)=>{
                    if(response.status==200){
                        const auth = getAuth(app);
                        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            navigate.push("/login"); 
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setError(errorCode+" :- "+errorMessage);
                        })
                    }else{
                        alert(response.data);
                    }
                    console.log(response);
                }).catch((error)=>{
                    setError(error.response.data);
                })
        }else{
            setLoading(false);
        }
        setLoading(false);
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
                "admin": adminEmail,
            }).then((response)=>{
                if(response.status==200){
                    const auth = getAuth(app);
                    createUserWithEmailAndPassword(auth, adminEmail, adminPassword).then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        navigate.push("/login"); 
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setOrgerror(errorCode+" :- "+errorMessage);
                    })
                }else{
                    setOrgerror(response.data);
                }
            }).catch((error)=>{
                setOrgerror(error.response.data);
            }).finally(()=>{
                navigate.push('/login')
                setLoading(false);
            })
        }else{
            setLoading(false);
        }
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
                <label style={{alignSelf:'center'}} htmlFor="cnfrmpass" >Confirm Password</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setIsPasswordValid(e.target.value)}} id="cnfrmpass" name="pass"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="aadhar" >Aadhar Number:</label>
                <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setAdhaar(e.target.value)}} id="aadhar" name="loginId"/><br/>
                {loading?<label htmlFor="loading">Loading...</label>:
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleSubmit}>SignUP</button>}
                
            <br/>

          
            </div>

            <div className={styles.card}>
            
              <div className={styles.pp}>
                Are You an Organization <br />
                </div>
                <br />
                    {orgerror?<label htmlFor="error">{orgerror}</label>:""}         
                    <label style={{alignSelf:'center'}} htmlFor="orgname">Organization Name</label>
                    <input style={{alignSelf:'center'}} type="text" onChange={(e)=>{setName(e.target.value)}} id="orgname" name="orgname"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="gstno">GST Number</label>
                    <input style={{alignSelf:'center'}} type="number" onChange={(e)=>{setGstNo(e.target.value)}} id="gstno" name="gstno"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="admin" >Enter Admin Email ID</label>
                    <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setAdminEmail(e.target.value)}} id="admin" name="admin"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="orgpass" >Set Password</label>
                    <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setAdminPassword(e.target.value)}} id="orgpass" name="orgpass"/><br/>

                    <label style={{alignSelf:'center'}} htmlFor="orgcpass" >Confirm Password</label>
                    <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setAdminConfirmPassword(e.target.value)}} id="orgcpass" name="orgcpass"/><br/>
                    {/* {name+" "+ gstNo+" "+  adminEmail+" "+  adminPassword+" "+  adminConfirmPassword} */}
                    {loading?<label htmlFor="loading">Loading...</label>:
                    <button style={{alignSelf:'center',width:'10vw'}} onClick={handleorgsubmit}>Login</button>}
                <br/>
            </div>
      </div>
    )
}