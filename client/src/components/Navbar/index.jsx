import { React, useState } from 'react';
import './styles.css';
import CreateAccount from './PopUps/CreateAccount/index.jsx';
import CreatePassword from './PopUps/CreatePassword';
import SignIn from './PopUps/SignIn/index.jsx';
import AccountCreationConfirmation from './PopUps/AccountCreationConfirmation/index.jsx';
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

  const handleSignUp = () => {
    setSignUp(true);
  };

  return (
    <header className={`navbar-container ${hideOnMobile ? 'navbar-hide-on-mobile' : ''}`}>
      <div className='navbar-left' onClick={() => navigate('/')}>
        <h2>Dibby</h2>
        <img src={dogIcon} alt='Dibby logo' className='navbar-logo' />
      </div>
      <nav className='navbar-right'>
        <a href='about' className='navbar-about'>
          About
        </a>
        <button onClick={handleSignUp} className='navbar-sign-in-sign-up'>
          Sign In / Sign Up
        </button>
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
        />
      )}
    </header>
  );
}

export default Navbar;
