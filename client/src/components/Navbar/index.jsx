import React from 'react';
import './styles.css';
import dogIcon from '../../assets/dibby_Dog_Logo.png';

function Navbar({ hideOnMobile }) {
  const handleAddPropertyButton = () => {
    console.log('This will eventually add a property');
  };

  return (
    <header className={`navbar ${hideOnMobile ? 'navbar-hide-on-mobile' : ''}`}>
      <div className='navbar-left'>
        <h2>Dibby</h2>
        <img src={dogIcon} alt='Dibby logo' className='navbar-logo' />
      </div>
      <nav className='navbar-right'>
        <a href='#' className='navbar-link'>
          About
        </a>
        <a href='#' className='navbar-link'>
          Sign In / Sign Up
        </a>
        <button
          className='navbar-add-property-btn'
          onClick={() => handleAddPropertyButton()}
        >
          Add Property
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
