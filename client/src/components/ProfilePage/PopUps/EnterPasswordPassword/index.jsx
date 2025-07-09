import { React, useState } from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function EnterPasswordPopUpPassword({ onClose, setEnterPasswordPassword, setUpdatePassword }) {
  const [password, setPassword] = useState('');
  const testPassword = 'dibby';

  const handleContinue = () => {
    if (password === testPassword) {
      setEnterPasswordPassword(false);
      setTimeout(() => {
        setUpdatePassword(true);
      }, 10);
    }
  };

  

  return (
    <div className='enter-password-pw-wrapper'>
      <div className='enter-password-pw-content'>
        <h6>Enter Current Password to Continue</h6>
        <div className='enter-password-pw-form'>
          <input
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='enter-password-pw-continue' onClick={handleContinue}>
            Continue
          </button>
          <p>Forgot Password?</p>
        </div>
      </div>
      <button onClick={onClose} className='enter-password-pw-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default EnterPasswordPopUpPassword;
