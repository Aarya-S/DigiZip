import { getSession } from '../utils/sessionhandling';
import Homebody from '../components/Homebody/Homebody';
export default function Home() {
  const session = getSession('user');
  return (
    <>
    
      <div className='heads'>
        <br />
        <br />
        <br />
        <div>
      {/* Welcome {session!=null?session.email.split("@")[0]:'Alien plz login to proceed'}! */}
      </div> 
      {session!=null?<Homebody/>:
        <div>
           <div>
      DigiZip
      <span>Secure Document Delivery</span>
    </div>
    <div>
      <h2>Send Documents Securely</h2>
      <p>Easily send important documents to organizations for verification purposes with DigiZip. Our secure platform ensures that your documents are delivered safely and privately.</p>
      <div>
        <button>Get Started</button>
      </div>
    </div>
        </div>}
        </div>
        
      
    </>
  )
}
