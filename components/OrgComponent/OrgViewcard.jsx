import { faChevronDown, faCircleMinus, faEye, faFileCircleCheck, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { removeSession } from '../../utils/sessionhandling';
import styles from './OrgViewcard.module.css';

// type FileType = {
//     id: number, //untouchable
//     filename: string, //untouchable
//     accessType: "Read only" | "Download",
//     endDate: string,
//     cid: string, //hidden data
// };

function handleClick() {
    let showButtons = document.getElementsByClassName(styles.actionButton + " expandFooter");
    
    for (var i = 0; i < showButtons.length; i++) {
        showButtons[i].addEventListener("click", toggleFooter);
    }
}

function toggleFooter() {
    let footer = this.parentElement.parentElement.nextElementSibling;
    if (footer.style.height === "0px") {
        footer.style.height = footer.scrollHeight + "px";
    } else {
        footer.style.height = "0px";
    }
}

export default function OrgViewCard(prop ){
    // State elements
    const [getfiles, setGetfiles] = useState(prop.prop);
    useEffect(() => {
        handleClick();
    });
    const client = axios.create({
        baseURL: "http://localhost:5000/preset",
    });
    const navigate = useRouter() 
    for (let index = 0; index < getfiles.files.length; index++) {
        getfiles.files[index].id = index;
    }

    // functions
    const columns = [
        { name: "File Name", uid: "file_name" },
        { name: "Access Type", uid: "access_type" },
        { name: "End Date", uid: "end_date" },
        { name: "View File", uid: "view_file"},
        { name: "Reject File", uid: "reject_file" },
    ];

    const HandleView = (files_prop) => {
        navigate.push("/previewFile/"+files_prop.CID+"."+files_prop.FileName+"."+files_prop.accesstype+"."+getfiles.description)
        // console.log(getfiles);
    }

    const HandleDeleteFileFromPreset = async (files_prop) => {
        const val = confirm("Are you sure you want to delete this file from preset you wont be able to access it again?").valueOf()
        if(val){
            alert("Deleting File please wait...")
            await client.delete("/removeFileFromPreset?orghash="+getfiles.orgHash+"&CID="+files_prop+"&prehash="+getfiles.generated_hash_preset)
            .then(res => {
                alert("File Deleted Successfully")
                removeSession("orgcontent")
                window.location.reload();
            }).catch(err => {
                alert("Error in Deleting File"+err)
            })}
    }

    const HandleDeletePreset = async () => {
        const val = confirm("Are you sure you want to delete this preset you wont be able to access it again?").valueOf()
        let foo = prompt('Write the feedback for preset Rejection it will get notified to the user');
        if(val && foo){
            alert("Deleting Preset please wait...")
            console.log(foo+" hi")
            // await client.delete("/del?hash="+getfiles.generated_hash_preset)
            // .then(res => {
            //     alert("Preset Deleted Successfully")
            //     removeSession("orgcontent")
            //     window.location.reload();
            // }).catch(err => {
            //     alert("Error in Deleting preset "+err)
            // })
            
        }
    }

    const files = getfiles.files;

    const renderCell = (file, columnKey) => {
        const cellValue = file[columnKey];
        switch (columnKey) {
            case "file_name":
                return (
                    <>{file.FileName}</>
                );
            case "access_type":
                return (
                    <>{file.accesstype}</>
                );
            case "end_date":
                return (
                    <>{file.time}</>
                );
            case "view_file":
                return (
                    <button className={styles.actionButton + " viewButton"}><FontAwesomeIcon onClick={()=>{HandleView({
                        CID: file.CID,
                        FileName: file.FileName,
                        accesstype: file.accesstype
                    })}} icon={faEye} /></button>
                );
            case "reject_file":
                return (
                    <button className={styles.actionButton + " rejectButton"}><FontAwesomeIcon onClick={()=>{HandleDeleteFileFromPreset(file.CID)}} icon={faCircleMinus} /></button>
                );
            default:
                return <>{cellValue}</>;
        }
    };

                

    return(
        <>
        <div className={styles.card}>
            {/* Header */}
            <div className={styles.cardHeader}>
                <div className={styles.groupDetails}>
                    <h3>{getfiles.email}</h3>
                    <text>{getfiles.Preset_name}</text>
                </div>
                <div className={styles.groupActions}>
                    {/* Accept file */}
                    {/* <Tooltip content="Accept file(s)" placement="top" hideArrow color="invert">
                    <button className={styles.actionButton + " acceptFile"}><FontAwesomeIcon icon={faFileCircleCheck} style={{color: "black", fontSize: "1.3rem"}} /></button>
                    </Tooltip> */}

                    {/* Reject File */}
                    <Tooltip content="Reject file(s)" placement="top" hideArrow color="invert">
                    <button className={styles.actionButton + " rejectFile"}><FontAwesomeIcon icon={faFileExcel} onClick={()=>{HandleDeletePreset()}} style={{color: "black", fontSize: "1.3rem"}} /></button>
                    </Tooltip>

                    {/* Expand footer */}
                    <button className={styles.actionButton + " expandFooter"}><FontAwesomeIcon icon={faChevronDown} style={{color: "black", fontSize: "1.3rem"}} /></button>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.cardFooter}>
            {getfiles.files.length>0?<Table
                headerLined shadow={false} fixed={true}
                aria-label="User table"
                css={{
                    height: "auto",
                    width: "100%",
                    zIndex: "1",
                }}>
                <Table.Header columns={columns}>
                    {(column)=> (<Table.Column
                    key={column.uid} >
                    {column.name} 
                </Table.Column>)}
                </Table.Header>
                <Table.Body items={files}>
                    {(item) => (
                    <Table.Row>
                        {(columnKey) => (
                        <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                    )}
                </Table.Body>
            </Table>:"No Files in this Preset"}
            </div>
        </div>
        </>
    );
}
