import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function PropertyListingCard({
  listing_id,
  property_id,
  backgroundImage,
  price,
  beds,
  baths,
  sqft,
  address,
  buildingName,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property-details/${property_id}?property_id=${property_id}&listing_id=${listing_id}`);
  };

  return (
    <div className='property-listing-card' onClick={handleCardClick}>
      <img
        src={backgroundImage}
        alt='Property'
        className='property-listing-image'
      />
      <div className='property-listing-info'>
        <h6 className='property-listing-price'>{price}</h6>
        <p className='property-listing-details'>
          {beds === 'Studio' ? 'Studio' : `${beds} bds`} | {baths} ba | {sqft} sqft
        </p>
        <p className='property-listing-address'>{address}</p>
        <p className='property-listing-building'>{buildingName}</p>
      </div>
    </div>
  );
}

export default PropertyListingCard;
