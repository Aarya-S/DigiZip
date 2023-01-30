import CryptoJS from 'crypto-js';
function createsession(User){
    console.log(process.env.NEXT_PUBLIC_SECRETKEY);
    const ct = CryptoJS.AES.encrypt(JSON.stringify(User), process.env.NEXT_PUBLIC_SECRETKEY).toString();
    sessionStorage.setItem('user', ct);
}

function getSession() {
    var bytes  = null;
    if (typeof window !== 'undefined') {
        // localStorage code here
    
    if(sessionStorage.getItem('user')!=null){
        bytes  = CryptoJS.AES.decrypt(sessionStorage.getItem('user'), process.env.NEXT_PUBLIC_SECRETKEY);
    }}
    // console.log(bytes.toString());
    if(bytes!=null){
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }else{
        return null;
    }
}
function removeSession(){
    sessionStorage.removeItem('user');
}

export {createsession,getSession,removeSession};