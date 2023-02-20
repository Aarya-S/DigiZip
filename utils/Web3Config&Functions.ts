import { Web3Storage } from 'web3.storage';

import { decryptArrayBuffer } from './EncryptFile';
import { decompressArrayBuffer } from './CompressFile';
import { handleDownload } from './HandleDownload';

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
  const cid = await client.put([file]).then(res => console.log(res)).catch(err => console.log(err))
  // console.log('stored files with cid:', cid)
  return cid
}

// retrieve Files
export async function retrieveFiles (cid: string) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res?.status}] ${res?.statusText}`)
  if (!res?.ok) {
    throw new Error(`failed to get ${cid}`)
  }
  let file = "";
  const buff = res.arrayBuffer().then(buffer => {
    console.log(buffer);
  });
  // console.log(res);
  res.text().then(text => {
    const outputString = text.indexOf("�") > -1 ? text.substring(0, text.indexOf("�")) : text;
    // console.log(outputString);
    // console.log(text.split("�"));
    // console.log(text);
    // const file = decryptArrayBuffer(text, "sussysus");
    // const decompressedFile = decompressArrayBuffer(file);
    // handleDownload(decompressedFile);
  });
  // request succeeded! do something with the response object here...
}
