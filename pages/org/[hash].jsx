import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import OrgViewCard from "../../components/OrgComponent/OrgViewcard";
import { getSession } from "../../utils/sessionhandling"
import styles from "../../styles/UserViewFiles.module.css";

export default function About() {
    const { query } = useRouter()
    const hash = query.hash?.toString() || ""
    const [org, setOrg] = useState([])
    const [orgdetaisl, setOrgDetails] = useState({})
    const client = axios.create({
        baseURL: 'http://localhost:5000',
    })
    const session = getSession('user');
    useEffect(() => {
        client.get('/org/getforuser?hash='+ hash+'&email='+session.email)
        .then((res) => {
            console.log(res.data.presets)
            setOrg(res.data.presets)
            setOrgDetails(res.data.orgdetails)
        })
    }, [])
    

    return (
      <div>
        <div>
            <h1>Org Name : - {orgdetaisl.name}</h1>
            <h1>Org Admin : - {orgdetaisl.admin}</h1>
            <h1>for futher queries please mail on above email</h1>
        </div>
        <div className={styles.cardsDiv}>
                {
                    org.map((file)=>{
                        return <div>
                            Preset Name : - {file.Preset_name}
                            <br />
                            created at : - {file.createdAt}
                            <br />
                            Last Updated at : - {file.updatedAt}
                            <br />
                            Description : - {file.description}
                            <br />
                            Access valid Till : - {file.time}
                            <br />
                            Files contains in presets are : - 
                            
                            {file.files.map((sharedfiles)=>{
                                return <div>
                                    <br />
                                    File CID : - {sharedfiles.CID}
                                    <br />
                                    File Name : - {sharedfiles.FileName}
                                    <br />
                                    Access Type : - {sharedfiles.accesstype}
                                    <br />
                                </div>
                            })}
                        </div>
                    })
                }
                {
                    <div style={{color: "white"}}>
                        {org.length==0 ?<p>No files found</p>:<></>}
                    </div>
                }
            </div>
      </div>
    )
  }