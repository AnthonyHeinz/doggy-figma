import React from 'react';
import './styles.css';

function ConfirmAndPayPopUp({
  isOpen,
  onClose,
  backgroundImage,
  beds,
  baths,
  sqft,
  location,
  buildingName,
}) {
  if (!isOpen) return null;
  return (
    <div className='confirm-pay-popup-overlay' onClick={onClose}>
      <div
        className='confirm-pay-popup-box'
        onClick={(e) => e.stopPropagation()}
      >
        <div id='confirm-pay-left-side'>
          <h5>Confirm and Pay</h5>
          <div id='confirm-pay-location-info'>
            <h6>Send a Viewer to this Address:</h6>
            <img
              src={backgroundImage}
              alt='location-picture'
              id='confirm-pay-picture'
            />
            <div className='confirm-pay-info'>
              <p className='confirm-pay-address'>{location}</p>
              <p className='confirm-pay-building'>{buildingName}</p>
              <p className='confirm-pay-details'>
                {beds} bds | {baths} ba | {sqft} sqft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAndPayPopUp;
