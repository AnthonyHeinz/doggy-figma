import React from 'react';
import './styles.css';
import search from '../../../assets/Search.png';
import { useState } from 'react';
import SendAViewer from '../SendAViewer/index.jsx';

function CitySection() {
  const [showSendAViewerPopup, setShowSendAViewerPopup] = useState(false);

  return (
    <div className='city-section-wrapper'>
      <section className='city-section-container'>
        <div className='city-content'>
          <h1>We tour properties just for you.</h1>
          <h6 className='city-content-h6-text'>
            Found a home that looks promising? Whether it’s listed on Dibby or
            somewhere else, we’ll send a trusted Viewer to tour it for you and
            give a full, honest report so you can move with confidence.
          </h6>
          <div className='city-options'>
            <div>
              <p className='city-content-p-text'>
                Start browsing listings on Dibby
              </p>
              <div className='city-section-input-wrapper'>
                <input
                  type='text'
                  placeholder='Enter city or ZIP Code'
                  className='city-options-input'
                />
                <button className='overlay-button'>
                  <img src={search} alt='Search' />
                </button>
              </div>
            </div>
            <div className='or-separator'>OR</div>
            <div>
              <p className='city-content-p-text'>
                Send a Viewer to a property you’ve found
              </p>
              <button
                className='viewer-button'
                onClick={() => setShowSendAViewerPopup(true)}
              >
                Send a Viewer
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='how-it-works-gradient-one'></div>
      <div className='city-white-background'></div>
      <SendAViewer
        isOpen={showSendAViewerPopup}
        onClose={() => setShowSendAViewerPopup(false)}
      />
    </div>
  );
}

export default CitySection;
