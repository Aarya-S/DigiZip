import CryptoJS from 'crypto-js';
function createsession(User,name){
    const ct = CryptoJS.AES.encrypt(JSON.stringify(User), process.env.NEXT_PUBLIC_SECRETKEY).toString();
    sessionStorage.setItem(name, ct);
}

function getSession(name) {
    var bytes  = null;
    if (typeof window !== 'undefined') {
        // localStorage code here
    
    if(sessionStorage.getItem(name)!=null){
        bytes  = CryptoJS.AES.decrypt(sessionStorage.getItem(name), process.env.NEXT_PUBLIC_SECRETKEY);
    }}
    // console.log(bytes.toString());
    if(bytes!=null){
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }else{
        return null;
    }
}
function removeSession(name){
    sessionStorage.removeItem(name);
}

export {createsession,getSession,removeSession};