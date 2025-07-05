import React from 'react';
import SignOutIcon from '../../../assets/signOutIcons.png';
import './styles.css';

function SignOut() {
  return (
    <div className='sign-out'>
      <button className='sign-out-button'>
        <img src={SignOutIcon} alt='signOutIcon' className='sign-out-icon' />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default SignOut;
