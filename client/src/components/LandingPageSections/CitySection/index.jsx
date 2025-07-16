import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import search from '../../../assets/Search.png';
import SendAViewer from '../SendAViewer/index.jsx';

function CitySection() {
  const [showSendAViewerPopup, setShowSendAViewerPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    if (trimmed) {
      navigate(`/property-listings?location=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className='city-section-wrapper'>
      <section className='city-section-container'>
        <div className='city-section-content'>
          <h1 className='city-section-h1-text'>
            We tour properties just for you.
          </h1>
          <h6 className='city-section-h6-text'>
            Found a home that looks promising? Whether it's listed on Dibby or
            somewhere else, we'll send a trusted Viewer to tour it for you and
            give a full, honest report so you can move with confidence.
          </h6>
          <div className='city-section-options'>
            <div>
              <p className='city-section-p-text'>
                Start browsing listings on Dibby
              </p>
              <div className='city-section-input-wrapper'>
                <input
                  type='text'
                  placeholder='Enter city or ZIP Code'
                  className='city-section-input'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className='city-section-overlay-button' onClick={handleSearchSubmit}>
                  <img src={search} alt='Search' />
                </button>
              </div>
            </div>
            <div className='city-section-or-separator'>OR</div>
            <div>
              <p className='city-section-p-text'>
                Send a Viewer to a property you've found
              </p>
              <button
                className='city-section-viewer-button'
                onClick={() => setShowSendAViewerPopup(true)}
              >
                Send a Viewer
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='city-section-gradient-one'></div>
      <div className='city-section-white-background'></div>
      <SendAViewer
        isOpen={showSendAViewerPopup}
        onClose={() => setShowSendAViewerPopup(false)}
      />
    </div>
  );
}

export default CitySection;
