import React from 'react';
import './citySection.css';
import search from '../assets/Search.png';

function CitySection() {
  return (
    <div className='city-wrapper'>
      <section className='city-section'>
        <div className='city-content'>
          <h1>We tour properties just for you.</h1>
          <p>
            Found a home that looks promising? Whether it’s listed on Dibby or
            somewhere else, we’ll send a trusted Viewer to tour it for you and
            give a full, honest report so you can move with confidence.
          </p>
          <div className='city-options'>
            <div>
              <p>Start browsing listings on Dibby</p>
              <div className='input-wrapper'>
                <input type='text' placeholder='Enter city or ZIP Code' />
                <button className='overlay-button'>
                  <img src={search} alt='Search' />
                </button>
              </div>
            </div>
            <div className='or-separator'>OR</div>
            <div>
              <p>Send a Viewer to a property you’ve found</p>
              <button className='viewer-button'>Send a Viewer</button>
            </div>
          </div>
        </div>
      </section>
       <div className='how-it-works-gradient-one'></div>
      <div className='city-white-background'></div>
    </div>
  );
}

export default CitySection;
