import React from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function SignIn({ onClose, setSignUp, setSignIn }) {
    const handleSignUp = () => {
        setSignIn(false);
        setTimeout(() => {
            setSignUp(true);
        }, 10)
    }
    return(
        <div className='sign-in-wrapper'>
              <div className='sign-in-content'>
                <h6>Sign In</h6>
                <input type='text' placeholder='Email Address'></input>
                <input type='text' placeholder='Password'></input>
                <button onClick={onClose} className='sign-in-continue'>
                  Continue
                </button>
                <div className='dont-have-account-content'>
                  <text>Dont' have an account yet?</text>
                  <button onClick={handleSignUp} className='sign-up'>
                    Sign Up
                  </button>
                </div>
                <button onClick={onClose} className='close-window'>
                  <img src={CloseWindow} />
                </button>
              </div>
            </div>
    )
}

export default SignIn;