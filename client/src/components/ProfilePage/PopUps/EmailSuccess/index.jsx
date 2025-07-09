import React from 'react';
import CheckMark from '../../../../assets/checkMark.png';
import './styles.css';

function EmailSuccessPopUp({ onClose }) {
  console.log('emailsuccess');
  return (
    <div className='email-success-wrapper'>
      <div className='email-success-content'>
        <img src={CheckMark} alt='checkMark' className='check-mark' />
        <p>Email Address updated successfully</p>
        <button onClick={onClose}>Return to Account</button>
      </div>
    </div>
  );
}

export default EmailSuccessPopUp;
