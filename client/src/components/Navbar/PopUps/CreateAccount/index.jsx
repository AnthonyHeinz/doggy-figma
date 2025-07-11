import React from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function CreateAccount({onClose, setCreatePassword, setSignUp, setSignIn}) {
  const handleContinue = () => {
    console.log('clicked')
    setSignUp(false);
    setTimeout(() => {
      setCreatePassword(true);
    }, 10);
  };

  const handleSignIn = () => {
    setSignUp(false);
    setTimeout(() => {
      setSignIn(true);
    }, 10);
  };

  return (
    <div className='create-account-wrapper'>
      <div className='create-account-content'>
        <h6>Create An Account</h6>
        <input type='text' placeholder='First Name'></input>
        <input type='text' placeholder='Last Name'></input>
        <input type='text' placeholder='Phone Number'></input>
        <input type='text' placeholder='Email Address'></input>
        <button onClick={handleContinue} className='sign-up-continue'>
          Continue
        </button>
        <div className='sign-up-content'>
          <text>Already have an Account?</text>
          <button onClick={handleSignIn} className='sign-in'>
            Sign in
          </button>
        </div>
        <button onClick={onClose} className='close-window'>
          <img src={CloseWindow} />
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
