import axios from "axios"
import { useRouter } from "next/router"
import { useState,useEffect } from "react"
import PdfViewer from "../../components/PdfViewer/PdfViewer"
import { decompressArrayBuffer } from "../../utils/CompressFile"
import { decryptArrayBuffer } from "../../utils/EncryptFile"
import { retrieveFiles } from "../../utils/Web3Config&Functions"

export default function previewFile() {
    const { query } = useRouter()
    const [cid, setCid] = useState(query.cid?.toString() || "")
    const [file,setFile]=  useState( new ArrayBuffer(0))
    const path = "https://"+cid.split('.')[0]+".ipfs.w3s.link/"+cid.split('.')[1];
    
    useEffect(() => {
      axios.get(path).then((res)=>{
        setFile(decompressArrayBuffer(decryptArrayBuffer(res.data)))
      })
    }, [])
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            hello world
            <br></br>
            {file.byteLength>0?<PdfViewer file={file}/>:<p>loading...</p>}
            <br></br>
            <button onClick={()=>{retrieveFiles(cid.split('.')[0],cid.split('.')[1])}}>Download</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            

        </div>
    )
    
}