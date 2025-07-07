import React from 'react';
import './styles.css';
import { useState } from 'react';
import ConfirmAndPayPopUp from '../../ConfirmAndPayPopUp/index.jsx';
import testDog from '../../../assets/testdog.jpeg';

function SendAViewer({ isOpen, onClose }) {
  const [showConfirmAndPayPopup, setShowConfirmAndPayPopup] = useState(false);
  const [houseDetails, setHouseDetails] = useState({
    location: '627 Belmont Ave #6, Los Angeles, CA 90026',
    buildingName: 'Belmont Apartments',
    beds: 2,
    baths: 1,
    sqft: 875,
  });
  if (!isOpen) return null;

  return (
    <div className='landing-send-a-viewer-popup-overlay'>
      <div className='landing-send-a-viewer-popup-box'>
        <button
          className='landing-send-a-viewer-close-button'
          onClick={onClose}
        >
          ×
        </button>
        <div className='landing-send-a-viewer-words-input-box'>
          <h5 className='landing-send-a-viewer-h5-text'>Send a Viewer</h5>
          <p className='landing-send-a-viewer-p-text'>
            For $49, you can send one of our trusted Viewers to tour and inspect
            an existing property listing that isn’t listed on Dibby.
          </p>
          <h6 className='landing-send-a-viewer-h6-text'>Enter Property URL</h6>
          <input
            placeholder='Property URL'
            className='landing-send-a-viewer-inputs'
          />
          <h6 className='landing-send-a-viewer-h6-text'>
            Enter Property Address
          </h6>
          <input
            placeholder='Address'
            className='landing-send-a-viewer-inputs'
          />
          <input
            placeholder='Apt, Unit, Floor, etc.'
            className='landing-send-a-viewer-inputs'
          />
          <input placeholder='City' className='landing-send-a-viewer-inputs' />
          <div className='landing-send-a-viewer-state-zip-inputs-box'>
            <input
              placeholder='Apt, Unit, Floor, etc.'
              className='landing-send-a-viewer-inputs'
            />
            <input
              placeholder='City'
              className='landing-send-a-viewer-inputs'
            />
          </div>
          <button
            id='landing-send-a-viewer-continue-to-payment-button'
            onClick={() => setShowConfirmAndPayPopup(true)}
          >
            Confirm and Pay
          </button>
          <ConfirmAndPayPopUp
            isOpen={showConfirmAndPayPopup}
            onClose={() => setShowConfirmAndPayPopup(false)}
            backgroundImage={testDog}
            beds={houseDetails.beds}
            baths={houseDetails.baths}
            sqft={houseDetails.sqft}
            location={houseDetails.location}
            buildingName={houseDetails.buildingName}
          />
        </div>
      </div>
    </div>
  );
}

export default SendAViewer;
