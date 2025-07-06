import { React,} from 'react';
import SignOutIcon from '../../../assets/signOutIcons.png';
import SignOutPopUp from '../PopUps/SignOut/index.jsx';
import './styles.css';

function SignOut( { setSignedOut }) {

  return (
    <div className='sign-out'>
      <button className='sign-out-button' onClick={() => setSignedOut(true)}>
        <img src={SignOutIcon} alt='signOutIcon' className='sign-out-icon' />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default SignOut;
