// import styles from '../styles/Home.module.css';

import { getSession } from '../utils/sessionhandling';
import Homebody from '../components/Homebody/homebody';
export default function Home() {
  const session = getSession();
  return (
    <>
    
      <div >
      Welcome {session!=null?session.displayname:'Alien plz login to proceed'}!
      </div>
      {session!=null?<Homebody/>:
        <div>
          hii
        
        </div>}
      

    </>
  )
}
