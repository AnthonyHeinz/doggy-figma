import { React, useState } from 'react';
import './styles.css';
import CreateAccount from './PopUps/CreateAccount/index.jsx';
import CreatePassword from './PopUps/CreatePassword';
import SignIn from './PopUps/SignIn/index.jsx';
import AccountCreationConfirmation from './PopUps/AccountCreationConfirmation/index.jsx';
import AccountDetailsDropDown from './AccountDetailsDropDown/index.jsx';
import dogIcon from '../../assets/dibby_Dog_Logo.png';
import { useNavigate } from 'react-router-dom';

function Navbar({ hideOnMobile }) {
  const navigate = useNavigate();

  const handleAddPropertyButton = () => {
    console.log('This will eventually add a property');
  };
  const [signUp, setSignUp] = useState(false);
  const [createPassword, setCreatePassword] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('John Smith');
  const [isSignInDropdownOpen, setIsSignInDropdownOpen] = useState(false);

  const handleSignInSignUp = () => {
    if (!isSignedIn) {
      setSignIn(true);
    } else {
      setIsSignInDropdownOpen(!isSignInDropdownOpen);
    }
  };

  const handleSignInSuccess = (userName = 'John Smith') => {
    setIsSignedIn(true);
    setUsername(userName);
    setSignIn(false);
  };

  return (
    <header className={`navbar-container ${hideOnMobile ? 'navbar-hide-on-mobile' : ''}`}>
      <div className='navbar-left' onClick={() => navigate('/')}>
        <h2>Dibby</h2>
        <img src={dogIcon} alt='Dibby logo' className='navbar-logo' />
      </div>
      <nav className='navbar-right'>
        <button onClick={() => navigate('/about')} className='navbar-about'>
          About
        </button>
        <button onClick={handleSignInSignUp} className='navbar-sign-in-sign-up'>
          {isSignedIn ? (
            <>
              {username} <span className={`navbar-custom-arrow ${isSignInDropdownOpen ? 'selected' : ''}`}></span>
            </>
          ) : (
            'Sign In / Sign Up'
          )}
        </button>
        {isSignInDropdownOpen && isSignedIn && (
          <AccountDetailsDropDown onClose={() => setIsSignInDropdownOpen(false)} />
        )}
        <button
          className='navbar-add-property-btn'
          onClick={() => handleAddPropertyButton()}
        >
          Add Property
        </button>
      </nav>
      {signUp && (
        <CreateAccount
          onClose={() => setSignUp(false)}
          setCreatePassword={setCreatePassword}
          setSignUp={setSignUp}
          setSignIn={setSignIn}
        />
      )}
      {createPassword && (
        <CreatePassword
          onClose={() => setCreatePassword(false)}
          setConfirmation={setConfirmation}
          setCreatePassword={setCreatePassword}
        />
      )}
      {confirmation && (
        <AccountCreationConfirmation onClose={() => setConfirmation(false)} />
      )}
      {signIn && (
        <SignIn
          onClose={() => setSignIn(false)}
          setSignUp={setSignUp}
          setSignIn={setSignIn}
          onSignInSuccess={handleSignInSuccess}
        />
      )}
    </header>
  );
}

export default Navbar;
