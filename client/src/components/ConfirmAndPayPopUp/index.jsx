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
        <section id='confirm-pay-left-side'>
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
          <div id='confirm-pay-viewing-details'>
            <p>Viewings will be completed within 3 business days.</p>
            <p>Viewing report will include the following:</p>
            <ul className='confirm-pay-list'>
              <li>Interior and exterior photos/videos</li>
              <li>Written report</li>
              <li>FaceTime call</li>
              <li>Neighborhood tour</li>
              <li>Street parking report</li>
              <li>Smell and noise level tests</li>
            </ul>
          </div>
        </section>
        <section id='confirm-pay-right-side'>
          <div className='confirm-pay-step-container'>
            <h6>
              1. Payment Price: <span className='confirm-pay-price'>$49</span>
            </h6>

            <h6>2. Enter contact information</h6>
            <input type='text' placeholder='Full Name' />
            <input type='text' placeholder='Phone Number' />
            <input type='email' placeholder='Email Address' />

            <h6>3. Add Payment Method</h6>
            <input type='text' placeholder='Card Number' />
            <div className='confirm-pay-input-row'>
              <input type='text' placeholder='MM/YY' />
              <input type='text' placeholder='CVC' />
            </div>
            <input type='text' placeholder='ZIP Code' />
            <input type='text' placeholder='Country/Region' />
            <button id='confirm-pay-send-a-viewer-button'>
              Confirm and Pay
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ConfirmAndPayPopUp;
