import React from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function EnterPasswordPopUp({ onClose }) {
  const [ password, setPassword ] = useState('');
  const testPassword = 'dibby';

  const handleContinue = () => {
    if (password === testPassword){

    }
  }

  return (
    <div className='enter-password-wrapper'>
      <div className='enter-password-content'>
        <h6>Enter Current Password to Continue</h6>
        <div className='enter-password-form'>
          <input type='text' placeholder='Password' />
          <button className='enter-password-continue'>Continue</button>
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
