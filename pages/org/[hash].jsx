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
        baseURL: 'https://digizip.onrender.com',
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
            <h5 style={{color:'white', marginLeft:'2vw', fontFamily:"'Poppins', sans-serif"}}>Organization Name - {orgdetaisl.name}</h5>
            <h5 style={{color:'white', marginLeft:'2vw', fontFamily:"'Poppins', sans-serif"}}>Organization Admin - {orgdetaisl.admin}</h5>
            <h6 style={{color:'gray', marginLeft:'2vw', fontStyle:"italic"}}> * For any queries, please communicate through above  email</h6> <hr style={{color:'white'}} /><br /> <br />
        </div>
        <div className={styles.cardsDiv}>
                {
                    org.map((file)=>{
                        return <div className={styles.card}>
                            Preset Name - {file.Preset_name}
                            <br />
                            Created at - {file.createdAt}
                            <br />
                            Last Updated at - {file.updatedAt}
                            <br />
                            Description - {file.description}
                            <br />
                            Access valid till - {file.time}
                            <br />

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