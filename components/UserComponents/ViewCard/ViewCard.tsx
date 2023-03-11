import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilePen, faTrashCan, faUserGroup, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from './ViewCard.module.css';
import Link from "next/link";
import { Modal, Table, Text, Tooltip, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import React from "react";

import { retrieveFiles } from "../../../utils/Web3Config&Functions";
import { useRouter } from "next/router";

// user structure
type UserType = {
    id: number, //untouchable
    // name: string, //untouchable
    read: boolean,
    download : boolean,
    time: string,
    status: String //hidden data
    org_hash: string //hidden data
};


// State variables



// untouchable code below ⬇️⬇️⬇️⬇️
// toggle footer visibility on click of view people button
function handleClick() {
    var showButtons = document.getElementsByClassName(styles.actionButton + " showPeople");
    
    // ispe confirmation modal daalna hai 🤡🤡🤡
    // var deleteButtons = document.getElementsByClassName(styles.actionButton + " deletePeople");
    

    // toggle footer visibility on click of view people button
    for (var i = 0; i < showButtons.length; i++) {
        showButtons[i].addEventListener("click", toggleFooter);
    }

    // show modal on click of delete button
    // for (var i = 0; i < deleteButtons.length; i++) {
    //     deleteButtons[i].addEventListener("click", showModal);
    // }
}

var toggleFooter = function() {
            var footer = this.parentElement.parentElement.parentElement.nextElementSibling;
            if (footer.style.height === "0px") {
            footer.style.height = footer.scrollHeight + "px";
            } else {
                footer.style.height = "0px";
            }
}

// modal ka code daalna hai

// untouchable code above ⬆️⬆️⬆️⬆️


// Handlers







export default function ViewCardUser(prop: any) {
    const [files, setFiles] = useState(prop.prop);
    const navigate = useRouter()
    const HandleView = () => {
        navigate.push("/previewFile/"+files.CID+"."+files.metadata.title)
    }
    useEffect(() => {
        handleClick(); //isko haath mat lagao
    });

    const columns = [
        { name: "Name", uid: "name" },
        { name: "Access Type", uid: "access_type" },
        { name: "End Date", uid: "end_date" },
        { name: "Status", uid: "status_byOrg" },
        { name: "Remove Access", uid: "remove_access" }
    ];

    for (var i = 0; i < files.access.length; i++) {
        files.access[i].id = i;
    }
    const users: UserType[] = files.access;


    const renderCell = (user: UserType, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof UserType];
        switch (columnKey) {
            case "name":
                return (
                    <>{user.org_hash}</>
                );
            case "access_type":
                return (
                    <>{user.download?"Download":user.read?"Read only":"No access Given"}</>
                );
            case "end_date":
                return (
                    <>{user.time}</>
                );
            case "status_byOrg":
                return (
                    <>{user.status}</>
                );
            case "remove_access":
                return (
                    // ek confirmation modal idhar bhi aana chahiye 🤡🤡🤡
                    <div style={{ display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "flex-start", color: "red", fontSize: "1.2rem"}}>
                        <button 
                        style={{background: "transparent", border: "none", outline: "none", cursor: "pointer"}}
                        onClick={() => console.log(user.org_hash)} >
                            <div>   
                            <FontAwesomeIcon icon={faMinusCircle} /> <text style={{fontSize: "0.9rem"}}>revoke </text>
                            </div>
                        </button>
                    </div>
                );
            default:
                return <>{cellValue}</>;
        }
    }

    
    return(
    <>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
            <div className={styles.docInfoDiv}>
                <div className={styles.docName}>{files.metadata.title}</div>
                <div className={styles.docSize}>{files.metadata.size/1000} MB</div>
            </div>
            <div className={styles.actionButtonsDiv}>
                {/* View file button */}
                <Tooltip content="View file" placement="top" hideArrow color="invert">
                <button className={styles.actionButton} onClick={HandleView}>
                    <FontAwesomeIcon icon={faEye} style={{ color: "black", fontSize: "1.3rem"}} />
                </button>
                </Tooltip>

                {/* Edit file button */}
                <Tooltip content="Edit file" placement="top" hideArrow color="invert">
                <button className={styles.actionButton}>
                    <FontAwesomeIcon icon={faFilePen} style={{ color: "black", fontSize: "1.3rem"}} />
                </button>
                </Tooltip>

                {/* Delete file button */}
                {/* ispe confirmation modal daalna hai 🤡🤡🤡 */}
                <Tooltip content="Delete file" placement="top" hideArrow color={"invert"} contentColor={"error"}>
                <button className={styles.actionButton + " deletePeople"}>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "red", fontSize: "1.3rem"}} />
                </button>
                </Tooltip>

                {/* View shared people button */}
                <Tooltip content="View shared people" placement="top" hideArrow color="invert">
                <button className={styles.actionButton + " showPeople"}>
                    <FontAwesomeIcon icon={faUserGroup} style={{ color: "black", fontSize: "1.3rem"}} />
                </button>
                </Tooltip>
            </div>
        </div>
        <div className={styles.cardFooter}>
            
            {files.access.length!=0?<Table
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
                <Table.Body items={users}>
                    {(item: UserType) => (
                    <Table.Row>
                        {(columnKey) => (
                        <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                    )}
                </Table.Body>
            </Table>:"No one has access to this file"}
        </div>
        </div>

    </>
    );
};

