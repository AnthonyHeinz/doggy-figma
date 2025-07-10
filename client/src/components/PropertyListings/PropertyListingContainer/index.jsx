import React from 'react';
import { useState, useEffect } from 'react';
import PropertyListingCard from '../PropertyListingCard';
import testDog from '../../../assets/testdog.jpeg';
import './styles.css';
import SortDropDown from '../SortDropDown';
import PropertyListingMap from '../PropertyListingMap';

function PropertyListingContainer({
  location,
  onToggleDropdown,
  dropdownStates,
}) {
  const [resultsNumber, setResultsNumber] = useState(0);
  const [activeMobileView, setActiveMobileView] = useState(null);

  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
  }

  const isMobile = useIsMobile();

  const hardcodedListings = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    backgroundImage: testDog,
    price: '$2,800/mo',
    beds: 2,
    baths: 1,
    sqft: 875,
    address: `627 Belmont Ave #${i + 1}, Los Angeles, CA 90026`,
    buildingName: 'Belmont Apartments',
  }));

  return (
    <div className='property-listing-results-map-container'>
      {!isMobile && <PropertyListingMap />}
      <section className='property-listing-results-container'>
        <h2 className='property-listing-results-container-h2-text'>
          Properties in {location}{' '}
        </h2>
        <div className='property-listing-results-sort-button-container'>
          <h4 className='property-listing-results-sort-button-container-h4-text'>
            {resultsNumber} Results
          </h4>
          <button
            className='property-listing-sort-button'
            onClick={() => onToggleDropdown('sort')}
          >
            Sort <span className='property-listing-sort-icon'>⇅</span>
          </button>
          {dropdownStates.sort && !isMobile && (
            <SortDropDown onClose={() => onToggleDropdown('sort')} />
          )}
        </div>
        <div className='property-listing-card-container'>
          {hardcodedListings.map((listing) => (
            <PropertyListingCard
              key={listing.id}
              backgroundImage={listing.backgroundImage}
              price={listing.price}
              beds={listing.beds}
              baths={listing.baths}
              sqft={listing.sqft}
              address={listing.address}
              buildingName={listing.buildingName}
            />
          ))}
        </div>
        <div className='property-listing-mobile-toggle-bar'>
          <button
            onClick={() => setActiveMobileView('map')}
            className='property-listing-mobile-toggle-bar-button'
          >
            Map
          </button>
          <span className='property-listing-mobile-toggle-bar-divider'>|</span>
          <button
            onClick={() => setActiveMobileView('sort')}
            className='property-listing-mobile-toggle-bar-button'
          >
            Sort
          </button>
        </div>
        {activeMobileView === 'map' && (
          <div className='property-listing-mobile-overlay'>
            <PropertyListingMap />
            <button
              onClick={() => setActiveMobileView(null)}
              className='property-listing-mobile-overlay-button'
            >
              Close
            </button>
          </div>
        )}
        {activeMobileView === 'sort' && (
          <div className='property-listing-mobile-overlay'>
            <SortDropDown onClose={() => setActiveMobileView(null)} />
          </div>
        )}
        <div id='property-listing-blurs'>
          <div id='property-listing-yellow-blur' />
          <div id='property-listing-pink-blur' />
          <div id='property-listing-blue-blur' />
          <div id='property-listing-orange-blur' />
        </div>
      </section>
    </div>
  );
}

export default PropertyListingContainer;
