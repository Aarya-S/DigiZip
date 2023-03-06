import { getSession } from '../utils/sessionhandling';
import Homebody from '../components/Homebody/Homebody';
import Link from 'next/link';
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
      <br /><br />
      <h2>Store and Send Documents Securely <hr className='hr1'/></h2> <br /><br />
      <text>Easily send important documents to organizations for verification purposes with DigiZip.</text> <br /><br />
       <text> Our secure platform ensures that your documents are delivered safely and privately.</text>
       <br /><br /><br />
      <div>
        <button><Link style={{color:'black'}} href={'/register'}>Get Started </Link><span className="material-symbols-outlined">mood</span>
        </button>
      </div>
    </div>
        </div>}
        </div>
        
      
    </>
  )
}
