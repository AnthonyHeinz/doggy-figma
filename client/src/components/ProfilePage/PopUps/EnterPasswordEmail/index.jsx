import { React, useState } from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function EnterPasswordPopUpEmail({ onClose, setEnterPasswordEmail, setUpdateEmail }) {
  const [password, setPassword] = useState('');
  const testPassword = 'dibby';

  const handleContinue = () => {
    if (password === testPassword) {
      setEnterPasswordEmail(false);
      setTimeout(() => {
        setUpdateEmail(true);
      }, 10);
    }
  };

  return (
    <div className='enter-password-email-wrapper'>
      <div className='enter-password-email-content'>
        <h6>Enter Current Password to Continue</h6>
        <div className='enter-password-email-form'>
          <input
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='enter-password-email-continue' onClick={handleContinue}>
            Continue
          </button>
          <p>Forgot Password?</p>
        </div>
      </div>
      <button onClick={onClose} className='enter-password-email-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default EnterPasswordPopUpEmail;
