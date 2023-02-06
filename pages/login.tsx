import React, { useState} from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../utils/firebaseconfig';
import { createsession,getSession,removeSession} from '../utils/sessionhandling';
import axios from 'axios';

export default function Login() {
    // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState(new Object());
  const navigate = useRouter();
  if(getSession('user')!=null){
    // alert("Already Logged in")
    navigate.push("/");
  }
  // functions to handle the input fields
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth(app);
    if(auth.currentUser!=null){
      removeSession('user');
      auth.signOut();
    }
    // console.log(email+" "+password)
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    //   // Signed in 
     createsession(userCredential.user,'user');
      axios.get('https://digizip.onrender.com/auth/getuser?email='+userCredential.user.email).then((res)=>{
          createsession(res.data,'userdetail');
      }).catch((err)=>{
          // console.log(err);
          setError(err.response.data);
      })
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode+" :- "+errorMessage);
    }).finally(()=>{
      setLoading(false);
      // createsession(data);
      // navigate.push("/")
    });
    // setLoading(false);
  }

    return (
        <div>
            
            {error?<label htmlFor="error">{error}</label>:""}
            <br/>
                <label htmlFor="loginId">Email ID or UserName:</label><br/>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label htmlFor="pass">Password:</label><br/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/>
                {loading?<label htmlFor="loading">Loading...</label>:
                <button onClick={handleSubmit}>Login</button>}
            <br/>
            {/* <button onClick={handleGSubmit}>Google</button> */}
            <button onClick={(e)=>{navigate.push('/register')}}>Signup</button>
            {email+" "+password}
      </div>
    )
}
