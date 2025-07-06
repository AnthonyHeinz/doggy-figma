import { React, useState } from 'react';
import SignOutIcon from '../../../assets/signOutIcons.png';
import SignOutPopUp from '../PopUps/SignOut/index.jsx';
import './styles.css';

function SignOut() {
  const [ signedOut, setSignedOut ] = useState(false);
  console.log('signed in state: ', signedOut);

  return (
    <div className='sign-out'>
      <button className='sign-out-button' onClick={() => setSignedOut(true)}>
        <img src={SignOutIcon} alt='signOutIcon' className='sign-out-icon' />
        <span>Sign Out</span>
      </button>
      {signedOut === true ? <SignOutPopUp onClose={() => setSignedOut(false)} /> : ''}
    </div>
  );
}

export default SignOut;
