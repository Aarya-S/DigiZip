import { faAlignCenter } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useRouter } from "next/router"
import { useState,useEffect } from "react"
import PdfViewer from "../../components/PdfViewer/PdfViewer"
import { decompressArrayBuffer } from "../../utils/CompressFile"
import { decryptArrayBuffer } from "../../utils/EncryptFile"
import { getSession } from "../../utils/sessionhandling"
import { retrieveFiles } from "../../utils/Web3Config&Functions"

export default function PreviewFile() {
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
              }).catch((err)=>{
                console.log(err)
                alert("network error")
              })
              break;
            }
          }
        }
      }else{
        const getuser = getSession('usercontent');
        if(getuser && file.byteLength==0){
          for(let i=0;i<getuser.length;i++){
            if(getuser[i].CID==cid.split('.')[0]){
              axios.get(path).then((res)=>{
                setFile(decompressArrayBuffer(decryptArrayBuffer(res.data)))
              }).catch((err)=>{
                console.log(err)
                alert("network error")
              })
              break;
            }
          }
        }
      }

      // axios.get(path).then((res)=>{
      //   setFile(decompressArrayBuffer(decryptArrayBuffer(res.data)))
      // })
    }, [])
    return (
        <div style={{marginTop:'5vh'}}>
            {file.byteLength>0?<PdfViewer file={file}/>:<p>Loading...</p>}
            <br></br>
            {cid.split('.')[2]=="download" || cid.split('.')[2]=="isuser"?
            <button style={{marginLeft:'5vw', backgroundColor: '#1e1e1e', color: 'white',  border: '2px solid white',borderRadius: '5px',padding:'10px', fontSize: '14px',fontWeight: '600',cursor: 'pointer',width:'10%',height: '100%', transition: 'all 0.3s ease-in-out'}} onClick={()=>{retrieveFiles(cid.split('.')[0],cid.split('.')[1])}}>Download</button>:""}
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