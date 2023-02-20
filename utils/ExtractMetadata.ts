import CryptoJS from 'crypto-js';
export default function extractMetadata(file: File){
    // Extract metadata from the file
    // Return the metadata

    const hash = file.text().then(text => CryptoJS.SHA256(text).toString());
    return {
        size : file.size,
        name : file.name,
        type : file.type,
        lastModified : file.lastModified,
        CreationDate : file.lastModified,
        hash : hash
    };
}