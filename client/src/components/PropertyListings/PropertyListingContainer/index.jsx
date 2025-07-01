import React from 'react';
import { useState } from 'react';
import PropertyListingCard from '../PropertyListingCard';
import testDog from '../../../assets/testdog.jpeg';
import './styles.css';
import SortDropDown from '../SortDropDown';

function PropertyListingContainer({
  location,
  onToggleDropdown,
  dropdownStates,
}) {
  const [resultsNumber, setResultsNumber] = useState(0);

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
      <section className='property-listing-map'></section>
      <section className='property-listing-results-container'>
        <h2>Properties in {location} </h2>
        <div className='property-listing-results-sort-button-container'>
          <h4>{resultsNumber} Results</h4>
          <button
            className='property-listing-sort-button'
            onClick={() => onToggleDropdown('sort')}
          >
            Sort <span className='property-listing-sort-icon'>⇅</span>
          </button>
          {dropdownStates.sort && (
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
