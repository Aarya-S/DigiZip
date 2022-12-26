import React, { useState} from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { app } from '../utils/firebaseconfig';
import { createsession,removeSession} from '../utils/sessionhandling';
export default function Login() {
    // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useRouter();
  // functions to handle the input fields
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth(app);
    if(auth.currentUser!=null){
        removeSession();
      auth.signOut();
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // session creation
      createsession(user);
      navigate.push("/");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode+" :- "+errorMessage);})
    setLoading(false);
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
            <button onClick={(e)=>{navigate.push('/register')}}>signup</button>
            {email+" "+password}
      </div>
    )
}
