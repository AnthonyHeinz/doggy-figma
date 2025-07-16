import React from 'react';
import './styles.css';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';

function YourHomeYourChoice() {
  return (
    <section className='home-choice-section'>
      <img src={dogIcon} alt='dogIcon' className='dog-icon' />
      <div className='home-choice-content'>
        <h1>Your Home, Your Choice</h1>
        <p>
          Use Dibby to schedule a property tour from our selection of listings
          or any other home you've found online.
        </p>
        <div className='home-choice-buttons'>
          <button className='home-choice-start-browsing-button'>Start Browsing on Dibby</button>
          <button className='home-choice-secondary-button'>
            Send a Viewer to a Property You've Found
          </button>
        </div>
      </div>
    </section>
  );
}

export default YourHomeYourChoice;
