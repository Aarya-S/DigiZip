import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilePen, faTrashCan, faUserGroup, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from './ViewCard.module.css';
import Link from "next/link";
import { Modal, Table, Text, Tooltip, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import React from "react";

import { retrieveFiles } from "../../../utils/Web3Config&Functions";

// user structure
type UserType = {
    id: number, //untouchable
    name: string, //untouchable
    accessType: "Read only" | "Download",
    endDate: string,
    cid: string, //hidden data
    orgHash: string //hidden data
};

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
const HandleView = () => {
    retrieveFiles("bafybeidjai2vj5vqjkba6s74bqyfbyevlvjtaj7nwgpxtrh4a643adz7ny");
}






export default function ViewCardUser() {
    

    useEffect(() => {
        handleClick(); //isko haath mat lagao
    });

    const columns = [
        { name: "Name", uid: "name" },
        { name: "Access Type", uid: "access_type" },
        { name: "End Date", uid: "end_date" },
        { name: "Remove Access", uid: "remove_access" },
    ];

    const users: UserType[] = [
        {
            id: 1,
            name: "Aarya Shelar",
            accessType: "Download",
            endDate: "12/12/2021",
            cid: "xyz",
            orgHash: "%$@$hash1"
        },
        {
            id: 2,
            name: "Aarya Shelar",
            accessType: "Read only",
            endDate: "12/12/2021",
            cid: "abc",
            orgHash: "%$@$hash2"
        },
        {
            id: 3,
            name: "Aarya Shelar",
            accessType: "Download",
            endDate: "12/12/2021",
            cid: "xyz",
            orgHash: "%$@$hash3"
        
        }
    ];


    const renderCell = (user: UserType, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof UserType];
        switch (columnKey) {
            case "name":
                return (
                    <>{user.name}</>
                );
            case "access_type":
                return (
                    <>{user.accessType}</>
                );
            case "end_date":
                return (
                    <>{user.endDate}</>
                );
            case "remove_access":
                return (
                    // ek confirmation modal idhar bhi aana chahiye 🤡🤡🤡
                    <div style={{ display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "flex-start", color: "red", fontSize: "1.2rem"}}>
                        <button 
                        style={{background: "transparent", border: "none", outline: "none", cursor: "pointer"}}
                        onClick={() => console.log(user.orgHash + user.cid)} >
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
                <div className={styles.docName}>Aadhaar Card</div>
                <div className={styles.docSize}>Size: 1.2 MB</div>
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
            
            <Table
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
            </Table>
        </div>
        </div>

    </>
    );
};

