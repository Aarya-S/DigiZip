import { Table } from "@nextui-org/react";
import styles from "../styles/sendfile.module.css"



export default function SendFiles() {
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

    const rows = [
        // isko dynamically load karde Rohit
        {
            key: "1",
            fileName: "Aadhaar Card",
            lastModified: "1/1/2021" 
        },
        {
            key: "2",
            fileName: "PAN Card",
            lastModified: "1/1/2021" 
        },
        {
            key: "3",
            fileName: "Passport",
            lastModified: "1/1/2021"
        }
    ]
        
    
    
    return (
        <>
        <div className={styles.container}>
            <div className={styles.titleText}>Send Files</div>
            <div className={styles.orgInfoLine}>
                <div className={styles.orgCodeInput}>
                    <input type="text" placeholder="Enter Organization Code" />
                </div>
                <div className={styles.orgNameInput}>
                    <input type="text" placeholder="Enter Organization Name" />
                </div>
            </div>
            <div className={styles.fileTitleLine}>
                <input type="text" placeholder="Enter file title" />    
            </div>  
            <div className={styles.fileDescLine}>
                <textarea placeholder="Enter file description" rows={3} />
            </div>
            <div className={styles.accessLine}>
                {/* Select access type */}
                <div className={styles.accessTypeDropDown}>
                    <span className={styles.accessTypeLabel}>Access Type:</span>
                    <select required style={{paddingLeft: "10px"}}>
                        <option value="defaultAccess">...</option>
                        <option value="public">Read only</option>
                        <option value="private">Download</option>
                    </select>
                </div>

                {/* Select duration */}
                <div className={styles.accessDurationDropDown}>
                    <span className={styles.accessDurationLabel}>Select duration:</span>
                    <select required style={{paddingLeft: "10px"}}>
                        <option value="defaultDuration">...</option>
                        <option value="public">1 day</option>
                        <option value="private">1 week</option>
                        <option value="private">1 month</option>
                        <option value="private">1 year</option>
                        <option value="private">Permanent</option>
                    </select>
                </div>
            </div>

            {/* Document selection area line */}
                <div className={styles.fileSelectionLine}>

                    <Table selectionMode="multiple">
                        <Table.Header columns={columns}>
                        {(column) => (
                        <Table.Column key={column.key}>{column.label}</Table.Column>
                        )}
                        </Table.Header>
                        <Table.Body items={rows} css={{backgroundColor: "white", color: "black",}}>
                            {(item) => (
                            <Table.Row key={item.key}>
                                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                            </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>
            
            {/* Buttons div */}
            <div className={styles.buttonsDiv}> 
                    <button className={styles.sendButton}>Send</button>                
                    <button className={styles.clearButton}>Clear form</button>
                
            </div>
        </div>
        <br /><br />
        </>
    );

}