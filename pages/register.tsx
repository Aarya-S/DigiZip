import React, { useEffect, useState  } from "react";
import validator from "../utils/PasswordValidator";
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../utils/firebaseconfig";
import { useRouter } from 'next/router';
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adhaar,setAdhaar] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState("");
    const navigate = useRouter();


    
    // functions to handle the input fields
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        if(password!=isPasswordValid){
            setError("Password mismatching confirm again");
            setLoading(false);
        }else if(!validator(password)){
            setError("Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character");
            setLoading(false);
            return validator(password);
        }else if(!validatedAdhaar()){
            setLoading(false);
            setError("Invalid Adhaar Number");
        }else{
            const auth = getAuth(app);
                        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            // ...
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setError(errorCode+" :- "+errorMessage);
                        })
            alert("User Registered Successfully sample hai ye");
                // setLoading(true)
                // axios.post("http://localhost:5000/api/auth/register",{
                //     email:email,
                //     aadhaar:adhaar
                // }).then((response)=>{
                //     if(response.status==200){
                //         const auth = getAuth(app);
                //         createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                //             // Signed in 
                //             const user = userCredential.user;
                //             // ...
                //         }).catch((error) => {
                //             const errorCode = error.code;
                //             const errorMessage = error.message;
                //             setError(errorCode+" :- "+errorMessage);
                //         })
                //         alert("User Registered Successfully");}
                //     else{
                //         alert("User Already Registered "+ response.data);
                //     }
                // }).catch((error)=>{
                //     setError(error)
                //     alert(error);
                // }).finally(()=>{
                //     setLoading(false);
                //     if(error==""){
                //     navigate.push("/login");}
                // })
                

                
            
        }

        setLoading(false);
    }
    const validatedAdhaar = () => {
        var regexp=/^.*$/;
        if(regexp.test(adhaar)){
            return true;
        }else{
            window.alert("Invalid Aadhar no.");
            return false;
        }
    }
    
    return (
        <>
            inside froms Signup <br/>
            {error?<span className="label warning">{error}</span>:""}
            {loading?<label htmlFor="loginId">just Showing loading here</label>:""}
            {message}
            <br/>
                <label htmlFor="loginId">Email ID:</label><br/>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label htmlFor="pass">Password:</label><br/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                <label htmlFor="confrmPass">confirm Password:</label><br/>
                <input type="password" onChange={(e)=>{setIsPasswordValid(e.target.value)}} id="confrmPass" name="confrmPass"/><br/>
                <label htmlFor="adhaar">Adhaar no:</label><br/>
                <input type="text" onChange={(e)=>{setAdhaar(e.target.value)}} id="adhaar" name="adhaar"/><br/>
                {
                    email+ " "+password+" "+adhaar
                }
            <br/>
            {loading ? <div>Loading...</div> : <button onClick={handleSubmit}>Signup</button>}

        </>
    )
}