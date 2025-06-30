import React from 'react';
import PropertyListingCard from '../PropertyListingCard';
import testDog from '../../../assets/testdog.jpeg';
import './styles.css'

function PropertyListingContainer({ location }) {
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
    <div>
      <h2>Properties in {location} </h2>
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
    </div>
  );
}

export default PropertyListingContainer;
