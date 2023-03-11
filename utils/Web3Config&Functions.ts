import { Web3Storage } from 'web3.storage';

import { decryptArrayBuffer } from './EncryptFile';
import { decompressArrayBuffer } from './CompressFile';
import { handleDownload } from './HandleDownload';

import axios from 'axios';
import PdfViewer from '../components/PdfViewer/PdfViewer';

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRhQjE0NzM2MTdFRDQ1OUFBMjREOUI5YWE5OEQ5YTkzMTFkNTVFNDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU2OTA2ODA2MzIsIm5hbWUiOiJEaWdpWmlwQmFzaWMifQ.NzMaXTXbe8csFfIJ2x6DhLjJ8F58ynb_B2AeXOLWZ5s'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

function stringToFile(content: string, fileName: string): File {
  const blob = new Blob([content], { type: "text/plain" });
  return new File([blob], fileName);
}



// Store Files
export async function storeFiles (content: String, filename: string) {
  const file = stringToFile(content.toString(), filename)
  const client = makeStorageClient()
  const cid = await client.put([file])
  // console.log('stored files with cid:', cid)
  return cid
}

// retrieve Files
export async function retrieveFiles (cid: string,name : string) {
  const path = "https://"+cid+".ipfs.w3s.link/"+name;
  await axios.get(path).then((response) => {
    handleDownload(decryptArrayBuffer(response.data),name);
  }).catch((error) => {
    console.log(error);
  });
  // request succeeded! do something with the response object here...
}
