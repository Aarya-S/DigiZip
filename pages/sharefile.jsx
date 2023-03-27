import { Table } from "@nextui-org/react";
import axios from "axios";
import { useEffect,useState } from "react";

import styles from "../styles/sendfile.module.css"
import { createsession, getSession } from "../utils/sessionhandling";


export default function SendFiles() {
    // state elems
    const[files,setFiles]=useState([]);
    const[preset_title,setPresetTitle]=useState("");
    const[preset_desc,setPresetDesc]=useState("");
    const[preset_access,setPresetAccess]=useState("");
    const[preset_duration,setPresetDuration]=useState("");
    const[preset_orgcode,setPresetOrgCode]=useState("");
    const[preset_orgname,setPresetOrgName]=useState("");
    let [selection,setSelection]=useState([]);



    const client = axios.create({
        baseURL: "https://digizip.onrender.com"
        // baseURL: "http://localhost:5000"
    })
    const Usersession = getSession('user');
    useEffect(() => {
        if(getSession('usercontent')!=null){
            setFiles(getSession('usercontent'));
        }else{
            client.get("/file/get?email="+Usersession.email).then((res)=>{
              createsession(res.data,'usercontent')
              setFiles(res.data);
            })
        }
    }, [])
    
    for(var i=0;i<files.length;i++){
        files[i].key=i;
    }

    const columns = [

        // idhar aur columns daal sakte hai like fileSize etc.

        {

            "key": "fileName",

            "label": "File Name"

        },

        {

            "key" : "lastModified",

            "label": "Last Modified"

        }

    ]



    const renderCell = (user, columnKey) => {
        const cellValue = files[columnKey];
        switch (columnKey) {
            case "fileName":
                return (
                    <>{user.metadata.title}</>
                );
            case "lastModified":
                return (
                    <>{user.updatedAt.split('T')[0]}</>
                );
            
            default:
                return <>{cellValue}</>;
        }
    }

    const handleclearform = () => {
        setPresetTitle("");
        setPresetDesc("");
        setPresetAccess("");
        setPresetDuration("");
        setPresetOrgCode("");
        setPresetOrgName("");
    }

    const handleselect = (key) => {
        // setSelection([]);
        // if(key=="all"){
        //     setSelection(files);
        // }else{
        //     key.forEach((value)=>{
        //             if(value!=undefined){
        //                 selection.push(files[value]);
        //                 setSelection(selection);
        //             }
        //         })
        // }
        // console.log(selection);

        // aarya's code
        if (key == "all") {
            selection = files;
        } else {
            selection = [];
            key.forEach((value)=>{
            if(value!=undefined){
                selection.push(files[value]);
                setSelection(selection);
            }
        },[])
        }
    }

    const handleSubmit = async () => {
        const filesarray = [];
            selection.forEach((value)=>{
                filesarray.push({
                    "CID": value.CID,
                    "FileName" : value.metadata.title,
                    "accesstype": preset_access,
                });
            })
        alert("Sharing files...");
        const date = new Date(preset_duration);
        const today = new Date();
        if(filesarray.length!=0 && preset_access!="defaultAccess" && date>today && preset_orgcode!="" && preset_orgname!="" && preset_title!="" && preset_desc!=""){
            await client.post("/preset/add",{
                "email": Usersession.email,
                "Preset_name": preset_title,
                "description": preset_desc,
                "orgHash": preset_orgcode,
                "files": filesarray,
                "time": preset_duration,
            }).then((res)=>{
                console.log(res.data);
                alert("Preset added successfully");
                handleclearform();
            }).catch((err)=>{
                console.log(err);
                alert("Error adding preset");
            })
        }else{
            alert("Please select files to add preset");
        }
        // console.log({
        //     "email": Usersession.email,
        //     "Preset_name": preset_title,
        //     "description": preset_desc,
        //     "orgHash": preset_orgcode,
        //     "files": filesarray,
        // });
    }

    const validateDate = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        if(selectedDate>today){
            // console.log(selectedDate.getFullYear()+"-"+selectedDate.getMonth()+"-"+selectedDate.getDate());
            setPresetDuration(date);
        }else{
            alert("Please select a valid date");
        }
    }

    return (

        <>

        <div className={styles.container}>

            <div className={styles.titleText}>Send Files</div>

            <div className={styles.orgInfoLine}>

                <div className={styles.orgCodeInput}>

                    <input type="text" required value={preset_orgcode} placeholder="Enter Organization Code" onChange={(e)=>setPresetOrgCode(e.target.value)}/>

                </div>

                <div className={styles.orgNameInput}>

                    <input type="text" value={preset_orgname} placeholder="Enter Organization Name" onChange={(e)=>setPresetOrgName(e.target.value)}/>

                </div>

            </div>

            <div className={styles.fileTitleLine}>

                <input type="text" value={preset_title} placeholder="Enter file title" onChange={(e)=>setPresetTitle(e.target.value)}/>    

            </div>  

            <div className={styles.fileDescLine}>

                <textarea value={preset_desc} placeholder="Enter file description" rows={3} onChange={(e)=>setPresetDesc(e.target.value)}/>

            </div>

            <div className={styles.accessLine}>

                {/* Select access type */}

                <div className={styles.accessTypeDropDown}>

                    <span className={styles.accessTypeLabel}>Access Type:</span>

                    <select required value={preset_access} style={{paddingLeft: "10px"}} onChange={(e)=>setPresetAccess(e.target.value)}>

                        <option value="defaultAccess">Select</option>

                        <option value="read">Read</option>

                        <option value="download">Download</option>

                    </select>

                </div>




                {/* Select duration */}

                <div className={styles.accessDurationDropDown}>

                    <span className={styles.accessDurationLabel}>Select duration:</span>

                    <input type="date" value={preset_duration} style={{paddingLeft: "10px",color:"white"}} onChange={(e)=>validateDate(e.target.value)}/>

                </div>

            </div>




            {/* Document selection area line */}
            {files.length!=0?
                <div className={styles.fileSelectionLine}>

                    <Table selectionMode="multiple" onSelectionChange={handleselect} defaultSelectedKeys={[]} >

                        <Table.Header columns={columns}>

                        {(column) => (

                            <Table.Column key={column.key}>{column.label}</Table.Column>

                        )}

                        </Table.Header>

                        <Table.Body items={files} css={{backgroundColor: "white", color: "black",}}>
                            {(item) => (
                            <Table.Row key={item.key}>
                                {(columnKey) => <Table.Cell>{renderCell(item,columnKey)}</Table.Cell>}
                            </Table.Row>
                            )}
                        </Table.Body>

                    </Table>

                </div>:"Add files to your account to send them."}

            {/* Buttons div */}

            <div className={styles.buttonsDiv}> 
                <button className={styles.sendButton} onClick={handleSubmit}>Send</button>                
                <button className={styles.clearButton} onClick={handleclearform}>Clear form</button>
            </div>

        </div>

        <br /><br />

        </>

    );




}