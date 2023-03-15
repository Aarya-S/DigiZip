import { faChevronDown, faCircleMinus, faEye, faFileCircleCheck, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Tooltip } from '@nextui-org/react';
import { useEffect } from 'react';
import styles from './ViewCard.module.css';


type FileType = {
    id: number, //untouchable
    filename: string, //untouchable
    accessType: "Read only" | "Download",
    endDate: string,
    cid: string, //hidden data
};

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

export default function ViewCard(){

    useEffect(() => {
        handleClick();
    });

    const columns = [
        { name: "File Name", uid: "file_name" },
        { name: "Access Type", uid: "access_type" },
        { name: "End Date", uid: "end_date" },
        { name: "View File", uid: "view_file"},
        { name: "Reject File", uid: "reject_file" },
    ];

    const files: FileType[] = [
        {
            id: 1,
            filename: "Aadhaar Card",
            accessType: "Download",
            endDate: "12/12/2021",
            cid: "xyz"
        },
        {
            id: 2,
            filename: "Passport",
            accessType: "Read only",
            endDate: "12/12/2021",
            cid: "abc"
        }
    ];

    const renderCell = (file: FileType, columnKey: React.Key) => {
        const cellValue = file[columnKey as keyof FileType];
        switch (columnKey) {
            case "file_name":
                return (
                    <>{file.filename}</>
                );
            case "access_type":
                return (
                    <>{file.accessType}</>
                );
            case "end_date":
                return (
                    <>{file.endDate}</>
                );
            case "view_file":
                return (
                    <button className={styles.actionButton + " viewButton"}><FontAwesomeIcon icon={faEye} /></button>
                );
            case "reject_file":
                return (
                    <button className={styles.actionButton + " rejectButton"}><FontAwesomeIcon icon={faCircleMinus} /></button>
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
                    <h3>Rohit Bichare</h3>
                    <text>Passport Application</text>
                </div>
                <div className={styles.groupActions}>
                    {/* Accept file */}
                    <Tooltip content="Accept file(s)" placement="top" hideArrow color="invert">
                    <button className={styles.actionButton + " acceptFile"}><FontAwesomeIcon icon={faFileCircleCheck} style={{color: "black", fontSize: "1.3rem"}} /></button>
                    </Tooltip>

                    {/* Reject File */}
                    <Tooltip content="Reject file(s)" placement="top" hideArrow color="invert">
                    <button className={styles.actionButton + " rejectFile"}><FontAwesomeIcon icon={faFileExcel} style={{color: "black", fontSize: "1.3rem"}} /></button>
                    </Tooltip>

                    {/* Expand footer */}
                    <button className={styles.actionButton + " expandFooter"}><FontAwesomeIcon icon={faChevronDown} style={{color: "black", fontSize: "1.3rem"}} /></button>
                </div>
            </div>

            {/* Footer */}
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
                <Table.Body items={files}>
                    {(item: FileType) => (
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
}