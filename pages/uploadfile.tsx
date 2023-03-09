import { ChangeEvent, useState } from 'react'
import extractMetadata from "../utils/ExtractMetadata";
import {compressArrayBuffer, decompressArrayBuffer} from "../utils/CompressFile";
import { encryptArrayBuffer,decryptArrayBuffer } from '../utils/EncryptFile';
import {storeFiles} from '../utils/Web3Config&Functions';
import { handleDownload } from '../utils/HandleDownload';
import PdfViewer from '../components/PdfViewer/PdfViewer';

export default function uploadfile() {

    const[file,setFile] = useState(new ArrayBuffer(0)); 
    const[outFile,setOutFile] = useState(new String);
    const[metadata,setMetadata] = useState(Object);
    const[password,setPassword] = useState("");
    const[orgcode,setOrgCode] = useState("");
    const[date,setDate] = useState("");
    const[downloadAccess,setDownloadAccess] = useState("");
    const[readAccess,setReadAccess] = useState(false);


    const[err,setErr] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files!=null && e.target.files.length<100000000){
          const file = e.target.files[0];
          const metadata = extractMetadata(file);
          setMetadata(metadata);
          file.arrayBuffer().then((buffer)=>{
            setFile(buffer);
          }).catch((err)=>{
            setErr(err);
          })
        }else{
          setErr("File size too large it should be less than 100MB");
        }
    }
    const upload = async () => {
        console.log(downloadAccess);
        if(password==""){
          setErr(err +"\n Please enter a password");
        }
        if(orgcode==""){
          setErr(err +"\nPlease enter a organization code");
        }
        if(file!=null && file.byteLength>0 && password!="" && orgcode!=""){
          // const compressedFile = compressArrayBuffer(file);
          // setFile(compressedFile);
          // try{
          // const encryptedFile = encryptArrayBuffer(compressedFile, "sussysus");
          // setOutFile(encryptedFile);
          
          // // console.log(decompressedFile);
          // }catch(err){
          //   console.log(err);
          // }
          console.log("Uploading file");
        // console.log(compressedFile);
        }
        
    }

    const download = async () => {
        
    }

    

    return (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <input type="file" onChange={(e)=>handleChange(e)} accept="application/pdf"></input>
            <button onClick={upload} hidden={file.byteLength==0}>Upload</button>
            <br></br>
            <br></br>
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
          
            {/* yaha pe radio input vagara daalde based on value wo downloadAccess & readAccess ka state Set or non Set karde */}
           
          </div>

          
          <br></br>
        {err}
        </>
    )
}
