import { ChangeEvent, useState } from 'react'
import extractMetadata from "..//utils/ExtractMetadata";
import {compressArrayBuffer, decompressArrayBuffer} from "../utils/CompressFile";
import { handleDownload } from '../utils/HandleDownload';
export default function uploadfile() {

    const[file,setFile] = useState(new ArrayBuffer(0)); 
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
        if(file!=null){
          const compressedFile = compressArrayBuffer(file);
          setFile(compressedFile);
        // console.log(compressedFile);
        }
        
    }

    return (
        <>
        <input type="file" onChange={(e)=>handleChange(e)} accept="application/pdf"></input>
        <button onClick={upload}>Upload</button>
        {err}
        </>
    )
}
