import React, { useState } from 'react';
import './styles.css';
import LocationSearch from '../../LocationSearch';
import SendAViewer from '../SendAViewer/index.jsx';
import searchIcon from '../../../assets/Search.png';

function CitySection() {
  const [showSendAViewerPopup, setShowSendAViewerPopup] = useState(false);

  // Handle custom search logic if needed
  const handleLocationSearch = async (searchTerm, locationId) => {
    console.log('Searching for:', searchTerm, 'Location ID:', locationId);
    // Custom search logic can be implemented here
  };

  // Handle location selection
  const handleLocationSelect = (suggestion, displayName) => {
    console.log('Selected location:', suggestion, 'Display name:', displayName);
    // Custom selection logic can be implemented here
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
              <LocationSearch
                apiKey={import.meta.env.VITE_REALTOR_API_KEY}
                placeholder="Enter city, ZIP code, or address"
                className="city-section-search"
                inputClassName="city-section-input"
                buttonClassName="city-section-overlay-button"
                searchIcon={<img src={searchIcon} alt="Search" />}
                navigateTo="/property-listings"
                queryParam="locationId"
                // Remove this line to use default navigation
                // onSearch={handleLocationSearch}
                // onSelect={handleLocationSelect}
                debounceMs={200}
                suggestionLimit={8}
              />
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
