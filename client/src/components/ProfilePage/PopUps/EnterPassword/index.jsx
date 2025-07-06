import { React, useState } from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function EnterPasswordPopUp({ onClose, setEnterPassword, setUpdateEmail }) {
  const [password, setPassword] = useState('');
  const testPassword = '';

  const handleContinue = () => {
    if (password === testPassword) {
      setEnterPassword(false);
      setTimeout(() => {
        setUpdateEmail(true);
      }, 1000);
    }
  };

  return (
    <div className='enter-password-wrapper'>
      <div className='enter-password-content'>
        <h6>Enter Current Password to Continue</h6>
        <div className='enter-password-form'>
          <input
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='enter-password-continue' onClick={handleContinue}>
            Continue
          </button>
          <p>Forgot Password?</p>
        </div>
      </div>
      <button onClick={onClose} className='enter-password-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default EnterPasswordPopUp;
