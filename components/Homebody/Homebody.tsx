import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faShareAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from './Homebody.module.css';
import { getSession } from "../../utils/sessionhandling";
import React, {useState,useEffect} from 'react';

const Homebody = () => {
    const session = getSession('userdetail');
    const orgdash = getSession('orgdetail');
    
    const Userlinks = () => {
      return(
        <>
        <h1>Welcome {session.email.split('@')[0]}</h1>
        <div className={styles.home__buttons}>
          <Link className={styles.view__files} href="/viewfiles">
            <FontAwesomeIcon icon={faEye} style={{marginRight: 20}}/> View Files
          </Link>

          <Link className={styles.share__file} href="/sharefile">
            <FontAwesomeIcon icon={faShareAlt} style={{marginRight: 20}} /> Share File
          </Link>

          <Link className={styles.add__file} href="/uploadfile">
            <FontAwesomeIcon icon={faUpload} style={{marginRight: 20}} /> Upload Files
          </Link>
        </div></>
      )
    }

    const Orglinks = () => {
      return(
        <>
        <h1>Wwelcome {orgdash.name}</h1>
      <div className={styles.home__buttons}>
          <Link className={styles.view__files} href="/orgviewfile">
            <FontAwesomeIcon icon={faEye} style={{marginRight: 20}}/> View Files
          </Link>

          <Link className={styles.share__file} href="/orgreqfile">
            <FontAwesomeIcon icon={faShareAlt} style={{marginRight: 20}} /> Request File
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