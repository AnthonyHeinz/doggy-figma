import React from 'react';
import './styles.css';

function AccountDetailsDropDown() {
  return (
    <div className='account-details-drop-down-container'>
      <div className='account-details-drop-down-content'>
        <button
          className='account-details-drop-down-option'
          onClick={() => console.log('Profile clicked')}
        >
          My Account
        </button>
        <button
          className='account-details-drop-down-option'
          onClick={() => console.log('Sign out clicked')}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default AccountDetailsDropDown;
