import { React, useState } from 'react';
import './styles.css';
import CloseWindow from '../../../../assets/closeWindow.png';


function CreatePassword({onClose, setConfirmation, setCreatePassword}) {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  

  const handleContinue = () => {
    console.log('HANDLE CONTINUE TRIGGERED')
    if (password1 === password2) {
      console.log('passwords match')
      setCreatePassword(false);
      setConfirmation(true);
    }
  };

  return (
    <div className='create-password-wrapper'>
      <div className='create-password-content'>
        <h6>Update Password</h6>
        <div className='create-password-form'>
          <input
            type='text'
            placeholder='Password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <input
            type='text'
            placeholder='Re-enter Password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button className='create-password-continue' onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
      <button onClick={onClose} className='create-password-close-window'>
        <img src={CloseWindow} />
      </button>
    </div>
  );
}

export default CreatePassword;
