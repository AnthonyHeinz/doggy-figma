import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propertyIcon from '../../../assets/propertyIcon.png';
import './styles.css';

const PropertyListingCard = React.forwardRef(({
  listing_id,
  property_id,
  backgroundImage,
  hasImage,
  price,
  beds,
  baths,
  sqft,
  address,
  buildingName,
}, ref) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    navigate(`/property-details/${property_id}?property_id=${property_id}&listing_id=${listing_id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Show placeholder if no image or image failed to load
  const showPlaceholder = !hasImage || !backgroundImage || imageError;

  return (
    <div 
      ref={ref}
      className='property-listing-card' 
      onClick={handleCardClick}
    >
      {showPlaceholder ? (
        <div className="property-listing-image-placeholder">
          <div className="property-listing-placeholder-content">
            <img 
              src={propertyIcon} 
              alt="Property icon"
              className="property-listing-placeholder-icon"
            />
            <span className="property-listing-placeholder-text">
              No photos available
            </span>
          </div>
        </div>
      ) : (
        <img
          src={backgroundImage}
          alt={`Property at ${address}`}
          className='property-listing-image'
          onError={handleImageError}
        />
      )}
      
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
});

PropertyListingCard.displayName = 'PropertyListingCard';
export default PropertyListingCard;
