import { useState} from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../utils/firebaseconfig';
import { createsession,getSession,removeSession} from '../utils/sessionhandling';
import axios from 'axios';
import styles from "../styles/Login.module.css"

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
    // navigate.push("/");
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
      navigate.push("/")
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode+" :- "+errorMessage);
    }).finally(()=>{
      setLoading(false);
      createsession(data);
    });
    // setLoading(false);
  }

    return (

      <div className={styles.window1}>

            <div className={styles.card}>
              
              <div className={styles.pp}>
                For User <br />
                </div>
                <br />
                {error?<label htmlFor="error">{error}</label>:""}         
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Email ID/UserName:</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Password:</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/><br />
                {loading?<label htmlFor="loading">Loading...</label>:
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleSubmit}>Login</button>}
                
            <br/>
            {/* <button onClick={handleGSubmit}>Google</button> */}
            {/* <button onClick={(e)=>{navigate.push('/register')}}>Signup</button> */}
            {/* {email+" "+password} */}

          
            </div>

            <div className={styles.card}>
            
              <div className={styles.pp}>
                For Organizations <br />
                </div>
                <br />
                {error?<label htmlFor="error">{error}</label>:""}         
                <label style={{alignSelf:'center'}} htmlFor="orgloginId">Organization Name/Employee ID:</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setEmail(e.target.value)}} id="orgloginId" name="orgloginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="orgpass">Password:</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="orgpass" name="orgpass"/><br/><br />
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