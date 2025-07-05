import React from 'react';
import SignOut from '../SignOut/index.jsx';
import CogIcon from '../../../assets/cogIcon.png';
import PropertyIcon from '../../../assets/propertyIcon.png';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import './styles.css';

function SideNavBar({ selected, setSelected }) {
  return (
    <div className='side-nav-bar'>
      <button
        className={selected === 'myAccount' ? 'active' : 'not-active'}
        onClick={() => setSelected('myAccount')}
      >
        <img src={CogIcon} alt='cogIcon' className='side-nav-bar-cog-icon' />
        <span>My Account</span>
      </button>
      <button
        className={selected === 'myPropertyListings' ? 'active' : 'not-active'}
        onClick={() => setSelected('myPropertyListings')}
      >
        <img
          src={PropertyIcon}
          alt='propertyIcon'
          className='side-nav-bar-property-icon'
        />
        <span>My Property Listings</span>
      </button>
      <div className='side-nav-bar-filler'>
        <img src={DogIcon} alt='dogIcon' className='side-nav-bar-dog-icon' />
      </div>
      <SignOut />
    </div>
  );
}

export default SideNavBar;
