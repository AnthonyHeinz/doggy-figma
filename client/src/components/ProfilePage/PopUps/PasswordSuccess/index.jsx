import React from 'react';
import CheckMark from '../../../../assets/checkMark.png';
import './styles.css';

function PasswordSuccessPopUp({ onClose }) {
  return (
    <div className='password-success-wrapper'>
      <div className='password-success-content'>
        <img src={CheckMark} alt='checkMark' className='check-mark' />
        <p>Password updated successfully</p>
        <button onClick={onClose}>Return to Account</button>
      </div>
    </div>
  );
}

export default PasswordSuccessPopUp;
