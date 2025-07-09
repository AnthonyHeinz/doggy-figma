import { React, useState } from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function UpdatePasswordPopUp({ setPasswordSuccess, setUpdatePassword, onClose}) {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  

  const handleContinue = () => {
    console.log('HANDLE CONTINUE TRIGGERED')
    if (password1 === password2) {
      console.log('passwords match')
      setUpdatePassword(false);
      setPasswordSuccess(true);
    }
  };
  return (
    <div className='update-password-wrapper'>
      <div className='update-password-content'>
        <h6>Update Password</h6>
        <div className='update-password-form'>
          <input
            type='text'
            placeholder='New Password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <input
            type='text'
            placeholder='New Password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button className='update-password-continue' onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
      <button onClick={onClose} className='update-password-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default UpdatePasswordPopUp;
