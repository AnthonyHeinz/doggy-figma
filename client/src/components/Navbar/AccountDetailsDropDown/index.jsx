import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function AccountDetailsDropDown({ onClose, onSignOut }) {
  const navigate = useNavigate();

  const handleMyAccountClick = () => {
    navigate('/profile');
    onClose();
  };

  const handleSignOutClick = () => {
    onSignOut();
    onClose();
  };

  return (
    <div className='account-details-drop-down-container'>
      <div className='account-details-drop-down-content'>
        <button
          className='account-details-drop-down-option'
          onClick={handleMyAccountClick}
        >
          My Account
        </button>
        <button
          className='account-details-drop-down-option'
          onClick={handleSignOutClick}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default AccountDetailsDropDown;
