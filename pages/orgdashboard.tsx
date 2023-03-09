import { useState } from "react";
import { getSession } from "../utils/sessionhandling";

export default function OrgDashBoard() {
    const orgdetail = getSession('orgdetail');
    const [admin, setAdmin] = useState(orgdetail.admin);


    const changeAdmin = () => {
        let person = prompt("Please enter your name", admin);
        if (person != null && person != "") {
            console.log(person);
            setAdmin(person);
        }
    }

    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        Name = {orgdetail.name}<br/>
        <br/>
        Admin = {admin} 
        <button onClick={changeAdmin}>edit</button><br/>
        <br/>
        Org Accounts :- 

        <div> 
            Account 1 = {orgdetail.accounts[0]}<button>edit</button><br/>
            Account 2 = {orgdetail.accounts[1]}<button>edit</button><br/>
            Account 3 = {orgdetail.accounts[2]}<button>edit</button><br/>
            <button>add more</button>
        </div><br/>
        Orgs_gst = {orgdetail.gst_no}<br/><br/>
        verified Admin = {orgdetail.verified_admin?
        <span>Yes</span>:
            <div>
                New Admin is not verified yet.<br/>
                Please verify by entering the otp send to admin email account<br/>
                <input type="text" placeholder="Enter OTP"/><button>Verify</button>
                <br/>
            </div>
        }<br/>
        verified org = {orgdetail.verified_org?
        <span>Yes</span>:
        <div>Your Organization is not verified yet.<br/>
            Please Apply for verification by following methods.
            <br/>
            <button>Apply for Verification</button>
            {/* Yaha pe GST verification / baki verification ka sources ka daaldenge */}
            
            </div>}
        <br/>
        <br/>
        <br/>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        </>
    )
}
