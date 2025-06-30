import React from 'react';
import './styles.css';

function PropertyListingCard({
  backgroundImage,
  price,
  beds,
  baths,
  sqft,
  address,
  buildingName,
}) {
  return (
    <div className='property-listing-card'>
      <img
        src={backgroundImage}
        alt='Property'
        className='property-listing-image'
      />
      <div className='property-listing-info'>
        <h6 className='property-listing-price'>{price}</h6>
        <p className='property-listing-details'>
          {beds} bds | {baths} ba | {sqft} sqft
        </p>
        <p className='property-listing-address'>{address}</p>
        <p className='property-listing-building'>{buildingName}</p>
      </div>
    </div>
  );
}

export default PropertyListingCard;
