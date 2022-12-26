import CryptoJS from 'crypto-js';
function createsession(User){
    const ct = CryptoJS.AES.encrypt(JSON.stringify(User), 'my-secret-key@123').toString();
    sessionStorage.setItem('user', ct);
}

function getSession() {
    var bytes  = null;
    if (typeof window !== 'undefined') {
        // localStorage code here
    
    if(sessionStorage.getItem('user')!=null){
        bytes  = CryptoJS.AES.decrypt(sessionStorage.getItem('user'), 'my-secret-key@123');
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