import styles from "../styles/About.module.css"
import { Image, css, Collapse, Text, Grid, red } from "@nextui-org/react";


export default function About() {
  return (
    <div className={styles.window2}>
        <div className={styles.headi}>
            Get to know more about DigiZip and it's capabilities 
        </div>
         <Grid.Container gap={3}>
      <Grid>
        <Collapse.Group splitted>
          <br />
          <Collapse title="What does DigiZip do?">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
            DigiZip simplifies and secures the process of document verification and sharing between two parties. To ensure that there are no unwanted delays in such a process, it has an encrypted and secure cloud-based store for documents. <br />
            We digitize the process of file sharing which has decentralized and encrypted cloud-based store for better security and privacy of data. DigiZip allows users and organizations to send and request specific document pairings, and share them with ease.

            </Text>
          </Collapse>
          <br />
          <Collapse title="What is the purpose of DigiZip ?">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
            Almost all organisations worldwide use document copies to verification purposes; this process requires the client to provide them with sets of document pairings for validation and authentication purposes. <br /> These pairings most of the time are not well described and result in multiple rounds to submit the correct documents. 
            This traditional process also consumes a lot of paper and printer ink thus at some magnitude proving harmful to the environment. There is a dire need to fasten the process and also make it digital for the convenience of the user. Thus, DigiZip is made with intention to tackle and solve above issues and come out as a easy to use digital platform for document verification and sharing.
            </Text>
          </Collapse>
          <br />
          <Collapse title="How is DigiZip different from DigiLocker?">
            <Image  src="digi.png"
      alt="Default Image" height={400} objectFit='contain'></Image>
          </Collapse>
          <br />
          <Collapse title="How secure is our data on DigiZip?">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
              DigiZip uses IPFS(Interplanetary File System) which is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace. <br />
              IPFS allows users to host and receive content in a manner similar to BitTorrent. As opposed to a centrally located server, IPFS is built around a decentralized system of user-operators who hold a portion of the overall data, creating a resilient system of file storage and sharing. Any user in the network can serve a file by its content address, and other peers in the network can find and request that content from any node who has it using a distributed hash table (DHT).
              
            </Text>
          </Collapse>
          <br />
          <Collapse title="How does DigiZip ensure fake or duplicate accounts?">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
              DigiZip which has its sole goal towards the secure storage and transfer of website and data of users does the following 2 things to ensure no duplicate or fake accounts are made - <br /><br />
              1. For USERS, while signing up on the platform, every user's identity is verified by using Aadhar ID and OTP. <br /><br />
              2. For ORGANIZATIONS, we ensure that while signing up on our platform the organization has to input unique registration number/ID provided by proper authority or government to them in the field in which they are operating, if they don not have any unique ID to prove their authenticity, we do not offer out platform to such organizations to avoid future complications.
            </Text>
          </Collapse>
          <br />
          <Collapse title="Preset as a  Feature">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
              For a smooth User Experience, we have presets for two functions - <br /><br />
              1. <b>Upload File </b> - In this function, the user can choose a document from a list of documents that they want to upload on their account to be stored for future uses, so that they do not have to configure any other information for that and simply upload the document by choosing the preset. <br /><br />
              2. <b>Share File</b> - Using this preset, the user while sending a bunch of documents or a single document can click on a preset from number of presets specifying the purpose for whcih the user wants to send the documents and by simply selecting it they will be provided with all the mandatory documents to be submitted rather than manually finding and doing it.
            </Text>
          </Collapse>
          <br />
          <Collapse title="How can one send files to organizations?">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
              User first of all, has to go to the <b>send files</b> sections, in which the user can select the files to be sent wither manually or using preset and then in the input field specify the Username/ID of the Organization to whom the user wants to send their files. <br /><br />
              Other way which user can send their files is that the Organization can itself request them from the user and then the user will be notified about it and can send the specified files.
            </Text>
          </Collapse>
          <br />
          <Collapse title="How does a user come to know whether their documents sent to the organizations have been verified or not?">
            <Text css={{color:'$gray800', fontSize:'18px'}}>
              In the <b>view files</b> section, the user can see a list of files stored by them on our platform, by clicking a button on the file, the user gets a list of organization to whom they have sent the file for verification and for the period of time, in that table itself the user gets to know whether their file has been successfully verified or has been rejected or any other comments have been given by the Organization regarding the documents.
            </Text>
          </Collapse>

        </Collapse.Group>
      </Grid>
    </Grid.Container>
    </div>
  );
}