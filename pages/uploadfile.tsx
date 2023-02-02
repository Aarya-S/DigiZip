import { ChangeEvent, useState } from 'react'
import extractMetadata from "..//utils/ExtractMetadata";
import {compressArrayBuffer, decompressArrayBuffer} from "../utils/CompressFile";
import { handleDownload } from '../utils/HandleDownload';
import { encryptArrayBuffer,decryptArrayBuffer } from '../utils/EncryptFile';
export default function uploadfile() {

    const[file,setFile] = useState(new ArrayBuffer(0)); 
    const[outFile,setOutFile] = useState(new String);
    const[metadata,setMetadata] = useState(Object);


    const[err,setErr] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files!=null){
          const file = e.target.files[0];
          const metadata = extractMetadata(file);
          setMetadata(metadata);
          file.arrayBuffer().then((buffer)=>{
            setFile(buffer)
          }).catch((err)=>{
            setErr(err);
          })

        }
    }
    const upload = async () => {
        if(file!=null && file.byteLength>0){
          const compressedFile = compressArrayBuffer(file);
          setFile(compressedFile);
          try{
          const encryptedFile = encryptArrayBuffer(compressedFile, "sussysus");
          setOutFile(encryptedFile);
          }
          catch(err){
            console.log(err);
          }
          // console.log(decompressedFile);
          
        // console.log(compressedFile);
        }
        
    }

    return (
        <>
        <input type="file" onChange={(e)=>handleChange(e)} accept="application/pdf"></input>
        <button onClick={upload} hidden={file.byteLength==0}>Upload</button>
        <button onClick={()=>handleDownload(file)} hidden={file.byteLength==0}>Download</button>
        {err}
        </>
    )
}