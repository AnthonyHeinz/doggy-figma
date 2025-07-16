import React, { useState } from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function SignIn({ onClose, setSignUp, setSignIn, onSignInSuccess }) {
    const [email, setEmail] = useState('');

    const handleSignUp = () => {
        setSignIn(false);
        setTimeout(() => {
            setSignUp(true);
        }, 10)
    }

    const handleContinue = () => {
        // Extract username from email (everything before @) or use default
        const username = email ? email.split('@')[0] : 'John Smith';
        onSignInSuccess(username);
    }

    return(
        <div className='sign-in-wrapper'>
              <div className='sign-in-content'>
                <h6>Sign In</h6>
                <input 
                  type='text' 
                  placeholder='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input type='text' placeholder='Password'></input>
                <button onClick={handleContinue} className='sign-in-continue'>
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