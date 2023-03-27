import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faShareAlt, faEye, faDownload, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from './Homebody.module.css';
import { getSession } from "../../utils/sessionhandling";
import React, {useState,useEffect} from 'react';

const Homebody = () => {
    const session = getSession('userdetail');
    const orgdash = getSession('orgdetail');
    
    const Userlinks = () => {
      return(
        <>
        <div className={styles.welcome}>Hey {session.email.split('@')[0]}, welcome to DigiZip!</div>
        <div className={styles.home__buttons}>
          <Link className={styles.view__files} href="/viewfiles">
            <FontAwesomeIcon icon={faEye} style={{marginRight: 20}}/> View Files
          </Link>

          {/* <Link className={styles.add__file} href="/addfile">
            <FontAwesomeIcon icon={faFileCirclePlus} style={{marginRight: 20}} /> Add Files
          </Link> */}

          <Link className={styles.share__file} href="/sharefile">
            <FontAwesomeIcon icon={faUpload} style={{marginRight: 20}} /> Share Files
          </Link>

        </div></>
      )
    }

    const Orglinks = () => {
      return(
        <>
        <div className={styles.welcome}>Welcome {orgdash.name}!</div>
      <div className={styles.home__buttons}>
          <Link className={styles.view__files} href="/orgviewfile">
            <FontAwesomeIcon icon={faEye} style={{marginRight: 20}}/> View Files
          </Link>

          <Link className={styles.share__file} href="/orgreqfile">
            <FontAwesomeIcon icon={faDownload} style={{marginRight: 20}} /> Request Files 
          </Link>
      </div>
      </>)
    }
    
    return (
        <>
        {orgdash==null?<Userlinks/>:
              <Orglinks/>}
        </>
    )


    

    };

export default Homebody;