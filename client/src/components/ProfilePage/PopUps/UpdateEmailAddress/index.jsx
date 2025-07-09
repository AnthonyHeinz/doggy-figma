import { React, useState } from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function UpdateEmailPopUp({ onClose, setUpdateEmail, setEmailSuccess }) {
  const [email, setEmail] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleContinue = () => {
    const isValidEmail = emailRegex.test(email);
    console.log('isValid: ', isValidEmail)
    if (isValidEmail) {
      setUpdateEmail(false);
      setEmailSuccess(true);
    }
  };


  return (
    <div className='update-email-wrapper'>
      <div className='update-email-content'>
        <h6>Update Email Address</h6>
        <div className='update-email-form'>
          <input
            type='text'
            placeholder='New Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='update-email-continue' onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
      <button onClick={onClose} className='update-email-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default UpdateEmailPopUp;
