import CryptoJS from 'crypto-js';


export function encryptArrayBuffer(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const numberArray = Array.from(uint8Array);
    const wordArray = CryptoJS.lib.WordArray.create(numberArray);
    const str = CryptoJS.enc.Hex.stringify(wordArray);
    return CryptoJS.AES.encrypt(str, process.env.NEXT_PUBLIC_ENCRYPTION_PASSWORD).toString();
}


export function decryptArrayBuffer(file) {
    const decrypted = CryptoJS.AES.decrypt(file, process.env.NEXT_PUBLIC_ENCRYPTION_PASSWORD);
    const str = decrypted.toString(CryptoJS.enc.Utf8);
    const wordArray = CryptoJS.enc.Hex.parse(str);
    const uint8Array = new Uint8Array(wordArray.words);
    return uint8Array.buffer;
}
