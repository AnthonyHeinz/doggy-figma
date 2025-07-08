import React from 'react';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import './styles.css';
import Founder from '../../../assets/founder.jpeg';

function MeetTheFounder() {
  return (
    <div className='meet-the-founder-section'>
      <div className='meet-the-founder-content'>
        <img
          src={DogIcon}
          alt='dogIcon'
          className='meet-the-founder-dog-icon'
        />
        <img src={Founder} alt='supremeLeader' className='founder' />
        <div className='meet-the-founder-text'>
          <h3>Meet The Founder</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className='gradient-three'></div>
    </div>
  );
}

export default MeetTheFounder;
