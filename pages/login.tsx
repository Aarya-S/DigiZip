import { useState} from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../utils/firebaseconfig';
import { createsession,getSession,removeSession} from '../utils/sessionhandling';
import axios from 'axios';
import styles from "../styles/Login.module.css"
import Link from 'next/link';

export default function Login() {
    // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [orgemail, setOrgEmail] = useState("");
  const [orgpassword, setOrgPassword] = useState("");
  const [orgerror, setOrgerror] = useState("");
  // const [orgloading, orgsetLoading] = useState(false);

  const navigate = useRouter();
  // if(error=="" && (getSession('user')!=null || getSession('orgdetail')!=null || getSession('userdetail')!=null)){
  //   navigate.push("/");
  // }

  // functions to handle the input fields
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth(app);
    if(auth.currentUser!=null){
      removeSession('user');
      removeSession('userdetail');
      auth.signOut();
    }
    // console.log(email+" "+password)
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    //   // Signed in 
     createsession(userCredential.user,'user');
      axios.get('https://digizip.onrender.com/auth/getuser?email='+userCredential.user.email).then((res)=>{
          // console.log(res);
          if(res.status==200){
            createsession(res.data,'userdetail').then((res)=>{
              navigate.push("/");
              setLoading(false);
            }).catch((err)=>{
              setError("Error Occured")
            });
          }
          else{
            setError(res.data);
            // setLoading(false);
          }
      }).catch((err)=>{
          setError(err.response.data);
          alert(err.response.data)
          // setLoading(false);
      })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage.split(" ")[2].split("/")[1].split(")")[0]);
      setLoading(false);
    })

   
  }

  const handleOrgSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setLoading(true);
      const auth = getAuth(app);
      if(auth.currentUser!=null){
        removeSession('user');
        removeSession('orgdetail');
        auth.signOut();
      }
      await signInWithEmailAndPassword(auth, orgemail, orgpassword).then((userCredential) => {
        // Signed in
        createsession(userCredential.user,'user');
        axios.get('https://digizip.onrender.com/org/get?email='+userCredential.user.email).then((res)=>{  
            if(res.status==200){
              createsession(res.data,'orgdetail').then((res)=>{
                navigate.push("/");
              }).catch((err)=>{
                setError("Error Occured")
              });
            }
            else{
              setOrgerror(res.data);
            }
        }).catch((err)=>{ 
            setOrgerror(err.response.data);
        })
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage.split(" ")[2].split("/")[1].split(")")[0]);
      })
  }

    return (

      <div className={styles.window1}>

            <div className={styles.card}>
              
              <div className={styles.pp}>
                For User <br />
                </div>
                <br />      
                <label style={{alignSelf:'center'}} htmlFor="loginId" >Email ID:</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setEmail(e.target.value)}} id="loginId" name="loginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="pass" >Password:</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setPassword(e.target.value)}} id="pass" name="pass"/><br/><br />
                {loading?<label htmlFor="loading" style={{alignSelf:'center'}}>Loading...</label>:
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleSubmit}>Login</button>}
                <Link href="/forgetpwd" style={{color: "blanchedalmond",alignSelf:"center",marginTop:"20px"}}>Forget Password</Link>
                {error?<label htmlFor="error" style={{color: "red",alignSelf:"center",marginTop:"20px"}}>{error}</label>:""} 
                
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
                        
                <label style={{alignSelf:'center'}} htmlFor="orgloginId">Admin ID:</label>
                <input style={{alignSelf:'center'}} type="email" onChange={(e)=>{setOrgEmail(e.target.value)}} id="orgloginId" name="orgloginId"/><br/>
                <label style={{alignSelf:'center'}} htmlFor="orgpass">Password:</label>
                <input style={{alignSelf:'center'}} type="password" onChange={(e)=>{setOrgPassword(e.target.value)}} id="orgpass" name="orgpass"/><br/><br />
                {loading?<label htmlFor="loading">Loading...</label>:
                <button style={{alignSelf:'center',width:'10vw'}} onClick={handleOrgSubmit}>Login</button>}
                <Link href="/forgetpwd" style={{color: "blanchedalmond",alignSelf:"center",marginTop:"20px"}}>Forget Password</Link>
                {orgerror?<label htmlFor="error" style={{color: "red",alignSelf:"center",marginTop:"20px"}}>{orgerror}</label>:""} 
            <br/>
            {/* <button onClick={handleGSubmit}>Google</button> */}
            {/* <button onClick={(e)=>{navigate.push('/register')}}>Signup</button>
            {email+" "+password} */}

            </div>
      </div>
    )
}