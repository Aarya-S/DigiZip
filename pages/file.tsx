
import { ChangeEvent, useRef, useState } from "react"
// import getPdfMetadata from "../utils/Metadataextracter";

export default function Files() {
    const[file,setfile] = useState(null);
    const[error,seterror] = useState(null);
    // CheckList
    const[compress,setCompress] = useState(false);
    const[encrypt,setEncrypt] = useState(false);
    const[extractmeta,setExtractmeta] = useState(false);
    


    const hiddenFileInput = useRef(null);



    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const i = event.target.files[0];
    //         getPdfMetadata(i).then((data) => {
    //             // console.log(data);
    //             setfile(data);
    //         }).catch((err) => {
    //             seterror(err);
    //         });
      
      
    //     }
    // }
    
    
    return (
        <div>
            {/* <input type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  accept="application/pdf"
                  id="file-input"
                   /> */}
                   <br></br>
                   
        </div>
    )
}
