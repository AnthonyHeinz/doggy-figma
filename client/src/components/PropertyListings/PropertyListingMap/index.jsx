import React from 'react';
import './styles.css';
import propertyListingTempMap from '../../../assets/Property-Listing-Temp-Map.png';

function PropertyListingMap() {
  return (
    <section className='property-listing-map'>
      <img
        src={propertyListingTempMap}
        alt='property-listing-map'
        className='property-listing-map-image'
      />
    </section>
  );
}

export default PropertyListingMap;
