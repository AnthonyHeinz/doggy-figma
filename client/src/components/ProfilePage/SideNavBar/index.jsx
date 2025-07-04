import React from 'react';
import SignOut from '../SignOut/index.jsx';
import CogIcon from '../../../assets/cogIcon.png';
import PropertyIcon from '../../../assets/propertyIcon.png';
import './styles.css';

function SideNavBar({ selected, setSelected }) {
  return (
    <div className='side-nav-bar'>
      <button
        className={selected === 'myAccount' ? 'active' : 'not-active'}
        onClick={() => setSelected('myAccount')}
      >
        <img src={CogIcon} alt='cogIcon' className='side-nav-bar-cog-icon' />
        My Account
      </button>
      <button className={selected === 'myPropertyListings' ? 'active' : 'not-active'} onClick={() => setSelected('myPropertyListings')}><img src={PropertyIcon} alt='propertyIcon' className='side-nav-bar-property-icon' />My Property Listings</button>
      <SignOut />
    </div>
  );
}

export default SideNavBar;
