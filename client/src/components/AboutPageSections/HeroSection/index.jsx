import React from 'react';
import './styles.css';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';

function HeroSection() {
  return (
    <div className='hero-section-wrapper'>
      <div className='about-hero-section'>
        <img src={dogIcon} alt='dogIcon' className='about-hero-dog-icon' />
        <div className='about-hero-section-content'>
          <h2>About Dibby</h2>
          <h6>
            Your on-demand apartment checker—get trusted eyes on any property,
            anytime.
          </h6>
        </div>
      </div>
      <div className='about-gradient-one'></div>
      <div className='about-gradient-two'></div>
      <div className='about-hero-white-background'></div>
    </div>
  );
}

export default HeroSection;
