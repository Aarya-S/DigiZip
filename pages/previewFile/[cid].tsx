import axios from "axios"
import { useRouter } from "next/router"
import { useState,useEffect } from "react"
import PdfViewer from "../../components/PdfViewer/PdfViewer"
import { decompressArrayBuffer } from "../../utils/CompressFile"
import { decryptArrayBuffer } from "../../utils/EncryptFile"
import { getSession } from "../../utils/sessionhandling"
import { retrieveFiles } from "../../utils/Web3Config&Functions"

export default function previewFile() {
    const { query } = useRouter()
    const [cid, setCid] = useState(query.cid?.toString() || "")
    const [file,setFile]=  useState( new ArrayBuffer(0))
    const path = "https://"+cid.split('.')[0]+".ipfs.w3s.link/"+cid.split('.')[1];
    
    useEffect(() => {
      // console.log(cid.split('.')[4])
      // console.log(cid.split('.')[2])

      if(cid.split('.')[4]=="isorg"){
        const getorg = getSession('orgcontent');
        if(getorg && file.byteLength==0){
          for(let i=0;i<getorg.length;i++){
            if(getorg[i].generated_hash_preset==cid.split('.')[5]){
              axios.get(path).then((res)=>{
                setFile(decompressArrayBuffer(decryptArrayBuffer(res.data)))
              })
              break;
            }else{
              alert("You are not authorized to view this file")
              window.location.href="/"
            }
          }
        }
      }else if(file.byteLength==0){
        const getuser = getSession('usercontent');
        if(getuser){
          for(let i=0;i<getuser.length;i++){
            if(getuser[i].CID==cid.split('.')[0]){
              axios.get(path).then((res)=>{
                setFile(decompressArrayBuffer(decryptArrayBuffer(res.data)))
              }).catch((err)=>{
                console.log(err)
                alert("network error")
              })
              break;
            }else{
              alert("You are not authorized to view this file")
              window.location.href="/"
            }
          }
        }
      }

      // axios.get(path).then((res)=>{
      //   setFile(decompressArrayBuffer(decryptArrayBuffer(res.data)))
      // })
    }, [])
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {file.byteLength>0?<PdfViewer file={file}/>:<p>loading...</p>}
            <br></br>
            {cid.split('.')[2]=="download" || cid.split('.')[2]=="isuser"?
            <button onClick={()=>{retrieveFiles(cid.split('.')[0],cid.split('.')[1])}}>Download</button>:""}
            {
              cid.split('.')[3]?
              <p>Description : {cid.split('.')[3]}</p>:""
            }
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            

        </div>
    )
    
}