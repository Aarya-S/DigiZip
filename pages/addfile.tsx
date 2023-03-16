import { ChangeEvent, useState } from 'react'
import extractMetadata from "../utils/ExtractMetadata";
import {compressArrayBuffer, decompressArrayBuffer} from "../utils/CompressFile";
import { encryptArrayBuffer,decryptArrayBuffer } from '../utils/EncryptFile';
import {retrieveFiles, storeFiles} from '../utils/Web3Config&Functions';
import { handleDownload } from '../utils/HandleDownload';
import PdfViewer from '../components/PdfViewer/PdfViewer';
import axios from 'axios';
import { getSession, removeSession } from '../utils/sessionhandling';

export default function uploadfile() {
// State variables
    const[file,setFile] = useState(new ArrayBuffer(0)); 
    const[metadata,setMetadata] = useState(Object);
    const[cid,setCid] = useState("");
    const[filehashst,setFilehash] = useState("");

    const[err,setErr] = useState("");
    const[loading,setLoading] = useState(false);

    const client = axios.create({
      baseURL: "https://digizip.onrender.com" 
      // baseURL: "http://localhost:5000"
    });
    const getUser = getSession('userdetail');



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
        if(file!=null && file.byteLength>0 && metadata!=null){
          setLoading(true);
          setErr("")
          const compressedFile = compressArrayBuffer(file);
          setFile(compressedFile);
          try{
            const encryptedFile = encryptArrayBuffer(compressedFile);
            const filehash = metadata.hash.then((res:String)=>{
              storeFiles(encryptedFile,metadata.name.split(".")[0]).then((cid)=>{
                setErr("")
                client.post("/file/add",{
                  email : getUser.email,
                  file_CID : cid,
                  FileHash : res,
                  password : 'sussybukka',
                  metadata : {
                      title : metadata.name.split(".")[0],
                      size : metadata.size,
                      creationDate : metadata.CreationDate,
                      lastModifiedDate : metadata.lastModified
                  },
                  access :[]
              }).then((res)=>{
                alert(res.data+" Successfully ");
                removeSession('usercontent');
                setLoading(false);
              }).catch((err)=>{
                setErr("something went wrong");
                console.log(err);
                setLoading(false);
              });
              
            });})
            
          }catch(err){
            console.log(err);
          }
        }
        
    }

    

    

    return (
        <>
          
          <div>
            <br></br>
            <br></br>
            <br></br>
            {err}
            <br></br> 
            <input type="file" onChange={(e)=>handleChange(e)} accept="application/pdf"></input>
            <button onClick={upload} hidden={file.byteLength==0 && !loading}>Upload</button>
            {loading?<div>Uploading...</div>:""}

            <br></br>
            <br></br>
           
          </div>

          
        </>
    )
}
