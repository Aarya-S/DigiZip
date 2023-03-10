import CryptoJS from 'crypto-js';
import { useState } from 'react';
export default function extractMetadata(file: File){
    // Extract metadata from the file
    // Return the metadata
    let hash = ""
    const filehash = file.text().then(text => {
        return CryptoJS.SHA256(text).toString()
    })
    return {
        size : file.size,
        name : file.name,
        type : file.type,
        lastModified : file.lastModified,
        CreationDate : file.lastModified,
        hash :filehash
    };
}