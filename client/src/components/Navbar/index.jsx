import React from 'react';
import './styles.css';
import dibbyLogo from '../../assets/dibby_Logo.svg';

function Navbar() {
  const handleAddPropertyButton = () => {
    console.log('This will eventually add a property');
  };

  return (
    <header className='navbar'>
      <div className='navbar-left'>
        <img src={dibbyLogo} alt='Dibby logo' className='navbar-logo' />
      </div>
      <nav className='navbar-right'>
        <a href='#' className='nav-link'>
          About
        </a>
        <a href='#' className='nav-link'>
          Sign In / Sign Up
        </a>
        <button
          className='add-property-btn'
          onClick={() => handleAddPropertyButton()}
        >
          Add Property
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
