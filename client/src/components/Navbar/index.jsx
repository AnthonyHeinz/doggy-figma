import { React, useState } from 'react';
import './styles.css';
import dibbyLogo from '../../assets/dibby_Logo.svg';
import CreateAccount from './PopUps/CreateAccount/index.jsx';
import CreatePassword from './PopUps/CreatePassword';
import SignIn from './PopUps/SignIn/index.jsx';
import AccountCreationConfirmation from './PopUps/AccountCreationConfirmation/index.jsx';


function Navbar({ hideOnMobile }) {
  const handleAddPropertyButton = () => {
    console.log('This will eventually add a property');
  };
  const [signUp, setSignUp] = useState(false);
  const [createPassword, setCreatePassword] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleSignUp = () => {
    setSignUp(true);
  };

  return (
    <header className={`navbar ${hideOnMobile ? 'hide-navbar-on-mobile' : ''}`}>
      <div className='navbar-left'>
        <img src={dibbyLogo} alt='Dibby logo' className='navbar-logo' />
      </div>
      <nav className='navbar-right'>
        <a href='#' className='nav-link'>
          About
        </a>
        <button onClick={handleSignUp} className='sign-in-sign-up'>
          Sign In / Sign Up
        </button>
        <button
          className='add-property-btn'
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
      {confirmation && <AccountCreationConfirmation onClose={() => setConfirmation(false)} />}
      {signIn && <SignIn onClose={() => setSignIn(false)} setSignUp={setSignUp} setSignIn={setSignIn} />}
    </header>
  );
}

export default Navbar;
