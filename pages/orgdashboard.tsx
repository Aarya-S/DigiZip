import { getSession } from "../utils/sessionhandling";

export default function OrgDashBoard() {
    const orgdetail = getSession('orgdetail');
    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        Name = {orgdetail.name}<br/>
        Admin = {orgdetail.admin}<br/>
        Accounts = {orgdetail.accounts}<br/>
        Orgs_gst = {orgdetail.gst_no}<br/>
        verified Admin = {orgdetail.verified_admin?
        <span>Yes</span>:<span>No</span>
        }<br/>
        verified org = {orgdetail.verified_org?
        <span>Yes</span>:<span>No</span>    
        }<br/>
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
