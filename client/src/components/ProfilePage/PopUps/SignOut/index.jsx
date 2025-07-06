import React from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function SignOutPopUp({ onClose }) {
  return (
    <div className='sign-out-popup-wrapper'>
      <div className='sign-out-popup-content'>
        <div className='sign-out-popup-content-text'>
          <h6>Sign Out?</h6>
          <p>You'll need to sign in again to access your account.</p>
        </div>
        <div className='sign-out-popup-content-buttons'>
          <button onClick={onClose} className='sign-out-popup-cancel'>
            Cancel
          </button>
          <button className='sign-out-popup-confirm'>Sign Out</button>
        </div>
      </div>
      <button onClick={onClose} className='sign-out-pop-up-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default SignOutPopUp;
