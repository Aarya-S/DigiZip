// import styles from '../styles/Home.module.css';

import { getSession } from '../utils/sessionhandling';
import Homebody from '../components/Homebody/Homebody';
export default function Home() {
  const session = getSession();
  return (
    <>
    
      <div >
      Welcome {session!=null?session.email.split("@")[0]:'Alien plz login to proceed'}!
      </div>
      {session!=null?<Homebody/>:
        <div>
          hii
        
        </div>}
      

    </>
  )
}
