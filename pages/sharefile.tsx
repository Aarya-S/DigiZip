import { useState } from "react";


export default function ShareFile() {
  
  const[password,setPassword] = useState("");
  const[orgcode,setOrgCode] = useState("");
  const[date,setDate] = useState("");
  const[downloadAccess,setDownloadAccess] = useState("");
  const[readAccess,setReadAccess] = useState(false);
  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Share File</h1>
        <input 
              type="password" 
              placeholder="Enter password for File Encryption" 
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}} ></input>

            {password==""?<button onClick={()=>setPassword("somethingdefault")}>Select Default</button>:""}
            <br></br>
            Enter Alphanumeric code of Organization to which you want to share the file with : - 
            <input type="text" placeholder="Enter code" onChange={(e)=>setOrgCode(e.target.value)}></input>
            <br></br>
            Select the Access Date 
            <input type="date" placeholder="Enter code" onChange={(e)=>setDate(e.target.value)}></input>
            <br></br>
        <div>
            YAHA CUSTOM PRESETS DAALDE AARYA
          </div>

          <div>
            YAHA STATIC PRESETS DAALDE AARYA
          </div>
    </div>
  )}