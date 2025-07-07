import React from 'react';
import './styles.css';
import { useState } from 'react';
import dogIcon from '../../assets/dibby_Dog_Logo.png';
import PaymentSuccessful from '../PaymentSuccessful';

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
  const [showPaymentSuccessfulPopup, setShowPaymentSuccessfulPopup] =
    useState(false);
  if (!isOpen) return null;
  return (
    <div className='confirm-pay-popup-overlay' onClick={onClose}>
      <div
        className='confirm-pay-popup-box'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='confirm-pay-popup-header'>
          <button
            className='confirm-pay-back-button'
            onClick={() => console.log('Back')}
          >
            {'<'} Back
          </button>
          <button className='confirm-pay-close-button' onClick={onClose}>
            ×
          </button>
        </div>
        <div id='confirm-pay-body'>
          <section id='confirm-pay-left-side'>
            <h5 id='confirm-pay-left-side-h5-text'>Confirm and Pay</h5>
            <div id='confirm-pay-location-info'>
              <h6 className='confirm-pay-location-info-h6-text'>
                Send a Viewer to this Address:
              </h6>
              {backgroundImage && (
                <img
                  src={backgroundImage}
                  alt='location-picture'
                  id='confirm-pay-picture'
                />
              )}
              <div className='confirm-pay-info'>
                <p className='confirm-pay-address'>{location}</p>
                <p className='confirm-pay-building'>{buildingName}</p>
                <p className='confirm-pay-details'>
                  {beds} bds | {baths} ba | {sqft} sqft
                </p>
              </div>
            </div>
            <div id='confirm-pay-viewing-details'>
              <h6 id='confirm-pay-viewing-details-h6-text'>Viewing Details</h6>
              <p className='confirm-pay-viewing-details-p-text'>
                Viewings will be completed within 3 business days.
              </p>
              <p className='confirm-pay-viewing-details-p-text'>
                Viewing report will include the following:
              </p>
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
              <h6 className='confirm-pay-step-container-h6-text'>
                1. Payment Price: <span className='confirm-pay-price'>$49</span>
              </h6>

              <h6 className='confirm-pay-step-container-h6-text'>
                2. Enter contact information
              </h6>
              <input
                type='text'
                placeholder='Full Name'
                className='confirm-pay-step-container-inputs'
              />
              <input
                type='text'
                placeholder='Phone Number'
                className='confirm-pay-step-container-inputs'
              />
              <input
                type='email'
                placeholder='Email Address'
                className='confirm-pay-step-container-inputs'
              />

              <h6 className='confirm-pay-step-container-h6-text'>
                3. Add Payment Method
              </h6>
              <input
                type='text'
                placeholder='Card Number'
                className='confirm-pay-step-container-inputs'
              />
              <div className='confirm-pay-input-row'>
                <input
                  type='text'
                  placeholder='MM/YY'
                  className='confirm-pay-step-container-inputs'
                />
                <input
                  type='text'
                  placeholder='CVC'
                  className='confirm-pay-step-container-inputs'
                />
              </div>
              <input
                type='text'
                placeholder='ZIP Code'
                className='confirm-pay-step-container-inputs'
              />
              <input
                type='text'
                placeholder='Country/Region'
                className='confirm-pay-step-container-inputs'
              />
            </div>
            <button
              id='confirm-pay-send-a-viewer-button'
              onClick={() => setShowPaymentSuccessfulPopup(true)}
            >
              Confirm and Pay
            </button>
          </section>
        </div>
        <img src={dogIcon} alt='dog icon' className='confirm-pay-dog-icon' />
      </div>
      <PaymentSuccessful
        isOpen={showPaymentSuccessfulPopup}
        onClose={() => setShowPaymentSuccessfulPopup(false)}
      />
    </div>
  );
}

export default ConfirmAndPayPopUp;
