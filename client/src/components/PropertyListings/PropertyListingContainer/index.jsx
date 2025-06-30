import React from 'react';
import PropertyListingCard from '../PropertyListingCard';
import testDog from '../../../assets/testdog.jpeg';

function PropertyListingContainer({ location }) {
  return (
    <div>
      <h2>Properties in {location} </h2>
      <PropertyListingCard
        backgroundImage={testDog}
        price='$2,800/mo'
        beds={2}
        baths={1}
        sqft={875}
        address='627 Belmont Ave #6, Los Angeles, CA 90026'
        buildingName='Belmont Apartments'
      />
    </div>
  );
}

export default PropertyListingContainer;
